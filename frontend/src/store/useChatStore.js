import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chat`,
});

// Configure axial with token from local storage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle session expiry (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('currentChatId');
      if (window.location.pathname !== '/login') {
          window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

const useChatStore = create((set, get) => ({
  chats: [],
  currentChatId: localStorage.getItem('currentChatId') || null,
  mood: 'Chill Buddy',
  selectedModel: 'gemini-1.5-flash',
  loading: false,
  error: null,
  abortController: null,
  isSpeaking: false,


  fetchChats: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get('/');
      const currentId = get().currentChatId;
      
      // Validation: If currentChatId isn't in the fetched list, clear it
      if (currentId && !data.find(c => c._id === currentId)) {
          localStorage.removeItem('currentChatId');
          set({ currentChatId: null });
      }

      set({ chats: data, loading: false });
    } catch (error) {
      set({ 
          error: error.response?.data?.message || 'Failed to fetch chats', 
          loading: false,
          currentChatId: null
      });
    }
  },

  createChat: async (mood) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post('/', { mood, model: get().selectedModel });
      localStorage.setItem('currentChatId', data._id);
      set((state) => ({ chats: [data, ...state.chats], currentChatId: data._id, loading: false }));
      return data._id;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create chat', loading: false });
    }
  },

  sendMessage: async (message, mood) => {
    const chatId = get().currentChatId;
    if (!chatId) return;

    // Optimistic Update: Show the user's message instantly
    const tempMessage = { role: 'user', content: message, _id: Date.now() };
    set((state) => ({
      chats: state.chats.map(c => 
        c._id === chatId 
        ? { ...c, messages: [...c.messages, tempMessage] } 
        : c
      ),
      loading: true, 
      error: null 
    }));

    const abortController = new AbortController();
    set({ abortController });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat/${chatId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ message, mood, model: get().selectedModel }),
          signal: abortController.signal
      });

      if (!response.ok) throw new Error('API Error');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let aiMessage = '';

      // Create a temporary AI message slot
      set((state) => ({
          chats: state.chats.map(c => 
              c._id === chatId 
              ? { ...c, messages: [...c.messages, { role: 'assistant', content: '', _id: 'streaming' }] } 
              : c
          )
      }));

      while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Remove the temporary _id 'streaming' now that it's done so React keys behave normally
            set((state) => ({
              chats: state.chats.map(c => {
                  if (c._id === chatId) {
                      const msgs = [...c.messages];
                      delete msgs[msgs.length - 1]._id;
                      return { ...c, messages: msgs };
                  }
                  return c;
              })
            }));
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
              if (line.startsWith('data: ')) {
                  const dataStr = line.replace('data: ', '');
                  if (dataStr === '[DONE]') continue;
                  try {
                      const { text, error } = JSON.parse(dataStr);
                      if (error) throw new Error(error);
                      if (text) aiMessage += text;
                      
                      // Update just the last message content
                      set((state) => ({
                          chats: state.chats.map(c => {
                              if (c._id === chatId) {
                                  let msgs = [...c.messages];
                                  msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], content: aiMessage };
                                  return { ...c, messages: msgs };
                              }
                              return c;
                          })
                      }));
                  } catch (e) {}
              }
          }
      }
      set({ loading: false, abortController: null });

      // Trigger Auto-Title implicitly after a response if it's potentially the first message
      const updatedChat = get().chats.find(c => c._id === chatId);
      if (updatedChat && updatedChat.title === 'New Chat') {
          get().generateTitle(chatId);
      }

    } catch (error) {
      set({ 
        error: error.name === 'AbortError' ? null : (error.response?.data?.message || 'Failed to send message'), 
        loading: false,
        abortController: null
      });
    }
  },

  generateTitle: async (chatId) => {
      try {
          const { data } = await api.post(`/${chatId}/title`);
          if (data && data.title) {
            set((state) => ({
                chats: state.chats.map(c => 
                    c._id === chatId ? { ...c, title: data.title } : c
                )
            }));
          }
      } catch (err) {
          console.warn("Failed to generate title", err);
      }
  },

  stopGeneration: () => {
      const { abortController } = get();
      if (abortController) {
          abortController.abort();
          set({ abortController: null, loading: false });
      }
  },

  toggleTTS: (isSpeaking) => set({ isSpeaking }),


  regenerateMessage: async (mood) => {
    const chatId = get().currentChatId;
    if (!chatId) return;

    // Optimistic Update: Remove the last assistant message
    set((state) => ({
      chats: state.chats.map(c => {
        if (c._id === chatId) {
          const updatedMessages = [...c.messages];
          if (updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].role === 'assistant') {
            updatedMessages.pop();
          }
          return { ...c, messages: updatedMessages };
        }
        return c;
      }),
      loading: true, 
      error: null
    }));

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat/${chatId}/regenerate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ mood, model: get().selectedModel })
        });

        if (!response.ok) throw new Error('API Error');

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let aiMessage = '';

        set((state) => ({
            chats: state.chats.map(c => 
                c._id === chatId 
                ? { ...c, messages: [...c.messages, { role: 'assistant', content: '', _id: 'streaming' }] } 
                : c
            )
        }));

        while (true) {
            const { value, done } = await reader.read();
            if (done) {
               // Remove temporary _id
               set((state) => ({
                 chats: state.chats.map(c => {
                     if (c._id === chatId) {
                         const msgs = [...c.messages];
                         delete msgs[msgs.length - 1]._id;
                         return { ...c, messages: msgs };
                     }
                     return c;
                 })
               }));
               break;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const dataStr = line.replace('data: ', '');
                    if (dataStr === '[DONE]') continue;
                    try {
                        const { text, error } = JSON.parse(dataStr);
                        if (error) throw new Error(error);
                        if (text) aiMessage += text;

                        set((state) => ({
                            chats: state.chats.map(c => {
                                if (c._id === chatId) {
                                    let msgs = [...c.messages];
                                    msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], content: aiMessage };
                                    return { ...c, messages: msgs };
                                }
                                return c;
                            })
                        }));
                    } catch (e) {}
                }
            }
        }
        set({ loading: false });
    } catch (error) {
        set({ error: error.response?.data?.message || 'Failed to regenerate', loading: false });
        // We could revert here, but fetchChats would be safer to restore state.
    }
  },

  deleteChat: async (chatId) => {
    // Keep a backup of the current state for rollback
    const previousChats = get().chats;
    const previousCurrentId = get().currentChatId;

    // Optimistic Update: Remove from list and handle active chat selection
    set((state) => {
      const remainingChats = state.chats.filter(c => c._id !== chatId);
      let newCurrentId = state.currentChatId;
      if (newCurrentId === chatId) {
        newCurrentId = remainingChats.length > 0 ? remainingChats[0]._id : null;
        if (newCurrentId) localStorage.setItem('currentChatId', newCurrentId);
        else localStorage.removeItem('currentChatId');
      }
      return { chats: remainingChats, currentChatId: newCurrentId, error: null };
    });

    try {
      await api.delete(`/${chatId}`);
    } catch (error) {
      // Revert on error
      set({ chats: previousChats, currentChatId: previousCurrentId, error: error.response?.data?.message || 'Failed to delete chat' });
      if (previousCurrentId) localStorage.setItem('currentChatId', previousCurrentId);
    }
  },

  setCurrentChat: (id) => {
      localStorage.setItem('currentChatId', id);
      set({ currentChatId: id });
  },
  
  setMood: (mood) => set({ mood }),
  setModel: (model) => set({ selectedModel: model }),
}));

export default useChatStore;

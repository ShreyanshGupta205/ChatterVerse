import { create } from 'zustand';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`,
});

// Response Interceptor: Handle session expiry (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('currentChatId');
      // Force reload to clear state and trigger Navigate to /login
      if (window.location.pathname !== '/login') {
          window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper: sync Firebase user with our MongoDB backend
const syncWithBackend = async (firebaseUser, username = null) => {
  const token = await firebaseUser.getIdToken();
  const { data } = await api.post(
    '/auth/sync/init',
    {
      username: username || firebaseUser.displayName || firebaseUser.email.split('@')[0],
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return { user: data, token };
};

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  signup: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      // 1. Create user in Firebase
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Set display name in Firebase
      await updateProfile(firebaseUser, { displayName: username });

      // 3. Sync to MongoDB backend, get our app user & Firebase token
      const { user, token } = await syncWithBackend(firebaseUser, username);

      set({ user, token, loading: false });
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      const msg = error.code === 'auth/email-already-in-use'
        ? 'Email already in use'
        : error.code === 'auth/weak-password'
        ? 'Password must be at least 6 characters'
        : error.response?.data?.message || 'Signup failed';
      set({ error: msg, loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      // 1. Sign in with Firebase
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);

      // 2. Sync to backend to get MongoDB profile
      const { user, token } = await syncWithBackend(firebaseUser);

      set({ user, token, loading: false });
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      const msg = error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password'
        ? 'Invalid email or password'
        : error.code === 'auth/user-not-found'
        ? 'No account found with this email'
        : error.code === 'auth/too-many-requests'
        ? 'Too many attempts. Please try again later'
        : error.response?.data?.message || 'Login failed';
      set({ error: msg, loading: false });
    }
  },

  loginWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      // 1. Open Google popup
      const { user: firebaseUser } = await signInWithPopup(auth, googleProvider);

      // 2. Sync to backend to get MongoDB profile
      const { user, token } = await syncWithBackend(firebaseUser);

      set({ user, token, loading: false });
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        set({ error: error.response?.data?.message || 'Google sign-in failed', loading: false });
      } else {
        set({ loading: false });
      }
    }
  },

  updateProfile: async (username, avatar) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const { data } = await api.patch('/auth/profile', { username, avatar }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedUser = { ...data };
      set({ user: updatedUser, loading: false });
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Profile update failed', loading: false });
      return false;
    }
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null, token: null });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('currentChatId');
  },
}));

export default useAuthStore;
export { api };

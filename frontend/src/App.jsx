import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatPage from './pages/Chat';
import Landing from './pages/Landing';
import InfoPage from './pages/InfoPage';
import useAuthStore from './store/useAuthStore';

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Landing Page as absolute root */}
        <Route 
            path="/" 
            element={token ? <Navigate to="/chat" /> : <Landing />} 
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/info/:pageId" element={<InfoPage />} />
        
        {/* Chat Interface Protected */}
        <Route 
          path="/chat" 
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          } 
        />
        
        {/* Redirect any other path to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext();

// This provides the auth state to the whole app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkLogin = async () => {
      const token = localStorage.getItem('ttm_token');
      if (token) {
        try {
          const res = await api.get('auth/me');
          setUser(res.data.user);
        } catch (err) {
          localStorage.removeItem('ttm_token');
          localStorage.removeItem('ttm_user');
        }
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  // Login function
  const login = async (formData) => {
    const res = await api.post('auth/login', formData);
    localStorage.setItem('ttm_token', res.data.token);
    localStorage.setItem('ttm_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data;
  };

  // Signup function
  const signup = async (formData) => {
    const res = await api.post('auth/signup', formData);
    localStorage.setItem('ttm_token', res.data.token);
    localStorage.setItem('ttm_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('ttm_token');
    localStorage.removeItem('ttm_user');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAuthenticated, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

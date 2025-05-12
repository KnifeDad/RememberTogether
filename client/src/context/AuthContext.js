import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.loggedIn());

  // Initialize user from token
  useEffect(() => {
    if (AuthService.loggedIn()) {
      const profile = AuthService.getProfile();
      setUser(profile);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    AuthService.login(token);
    const profile = AuthService.getProfile();
    setUser(profile);
    setIsAuthenticated(true);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

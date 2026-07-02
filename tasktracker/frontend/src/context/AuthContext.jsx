import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth.js';
import { connectSocket, disconnectSocket } from '../api/socket.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('sprout_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const me = await authApi.getMe(token);
        if (cancelled) return;
        setUser(me);
        connectSocket(token);
      } catch (err) {
        if (cancelled) return;
        localStorage.removeItem('sprout_token');
        setToken(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    localStorage.setItem('sprout_token', data.token);
    setUser(data);
    setToken(data.token);
    connectSocket(data.token);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await authApi.register(name, email, password);
    localStorage.setItem('sprout_token', data.token);
    setUser(data);
    setToken(data.token);
    connectSocket(data.token);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('sprout_token');
    setUser(null);
    setToken(null);
    disconnectSocket();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
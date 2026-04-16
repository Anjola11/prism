import React, { createContext, useContext, useState, useEffect } from 'react';


interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Checks for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const res = await api.get('/auth/me');
        // setUser(res.data);
        
        // Mocking for development
        const sess = localStorage.getItem('prism_mock_sess');
        if (sess) {
          setUser(JSON.parse(sess));
        }
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    // try {
    //   const res = await api.post('/auth/login', { email, password: pass });
    //   setUser(res.data);
    // } catch (e) { throw e; }
    
    // Mock login
    if (email && pass) {
      const mockUser: User = { id: '1', email, name: 'Demo User', role: 'admin' };
      setUser(mockUser);
      localStorage.setItem('prism_mock_sess', JSON.stringify(mockUser));
    }
  };

  const logout = async () => {
    // await api.post('/auth/logout');
    setUser(null);
    localStorage.removeItem('prism_mock_sess');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

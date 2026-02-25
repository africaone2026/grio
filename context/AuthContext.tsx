'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { User, LoginCredentials, SignupData } from '@/lib/types';
import { users as mockUsers } from '@/lib/mockData';

const SESSION_KEY = 'auth_user';

const MOCK_PASSWORDS: Record<string, string> = {
  'amara@example.com': 'demo123',
  'david@example.com': 'demo123',
  'grace@example.com': 'demo123',
  'james.teacher@kampala-high.ug': 'demo123',
  'rose.teacher@kampala-high.ug': 'demo123',
  'admin@kampala-high.ug': 'demo123',
  'mutale.teacher@lusaka-secondary.zm': 'demo123',
  'namwinga.teacher@lusaka-secondary.zm': 'demo123',
  'admin@lusaka-secondary.zm': 'demo123',
  'michael.teacher@intl-academy.edu': 'demo123',
  'priya.teacher@intl-academy.edu': 'demo123',
  'admin@intl-academy.edu': 'demo123',
  'superadmin@grio.ai': 'admin123',
};

let usersStore: User[] = [...mockUsers];

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => void;
  signup: (data: SignupData) => Promise<User>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch {
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<User> => {
    const found = usersStore.find((u) => u.email === credentials.email);
    if (!found) throw new Error('Invalid email or password.');
    const expectedPassword = MOCK_PASSWORDS[credentials.email];
    if (expectedPassword && credentials.password !== expectedPassword) {
      throw new Error('Invalid email or password.');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    }
    setUser(found);
    return found;
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_KEY);
    }
    setUser(null);
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<User> => {
    if (!data.name.trim()) throw new Error('Name is required.');
    if (data.password.length < 6) throw new Error('Password must be at least 6 characters.');
    if (usersStore.find((u) => u.email === data.email)) {
      throw new Error('An account with this email already exists.');
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role ?? 'independent',
      schoolId: null,
      classroomId: null,
      countryId: data.countryId,
      curriculumId: data.curriculumId,
      subscriptionStatus: 'trial',
      joinedAt: new Date().toISOString(),
    };
    usersStore.push(newUser);
    MOCK_PASSWORDS[data.email] = data.password;
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    }
    setUser(newUser);
    return newUser;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

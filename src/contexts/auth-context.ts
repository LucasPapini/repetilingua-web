//Passo 1: Definição das Tipagens e do Contexto
//Arquivo sem JSX para evitar warnings do Vite
import { createContext } from 'react';
import type { SignInForm } from '@/pages/auth/sing-in';

export interface User {
  username: string;
  roles: string[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (data: SignInForm) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Passo 2: Componente Provider
// Responsável pelo estado global, decodificação do JWT do Spring e persistência

import { useEffect, useState, useCallback, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { SignInForm } from '@/pages/auth/sing-in';
import { signInRequest } from '@/api/sign-in';
import { AuthContext, type User } from './auth-context';

interface JWTPayload {
  username: string;
  authorities: string[];
  exp: number;
}

const TOKEN_KEY = '@repetilingua:access_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      try {
        const decoded = jwtDecode<JWTPayload>(token);

        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            username: decoded.username,
            roles: decoded.authorities,
          });
        } else {
          signOut();
        }
      } catch {
        signOut();
      }
    }
    setIsLoading(false);
  }, [signOut]);

  async function signIn(credentials: SignInForm) {
    const data = await signInRequest(credentials);
    const { access_token } = data;

    localStorage.setItem(TOKEN_KEY, access_token);

    const decoded = jwtDecode<JWTPayload>(access_token);
    setUser({
      username: decoded.username,
      roles: decoded.authorities,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

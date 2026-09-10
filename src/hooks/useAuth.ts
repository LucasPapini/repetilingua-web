// Passo 3: Hook Customizado
// (Para consumir o contexto sem erros de escopo)
import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth-context';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context || !context.signIn) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}

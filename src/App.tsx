import './styles.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query';
import { AuthProvider } from './contexts/AuthProvider';
import { Toaster } from 'sonner';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/*/Passo 4: Envolver a Aplicação no \Garante que todo o roteamento enxergue o contexto\*/}
        <Toaster position="top-right" richColors closeButton /> {/** Adicionado o Toaster com suporte a temas e ícones */}
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App

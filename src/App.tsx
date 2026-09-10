import './styles.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query';
import { AuthProvider } from './contexts/AuthProvider';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/*/Passo 4: Envolver a Aplicação no \Garante que todo o roteamento enxergue o contexto\*/}
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App

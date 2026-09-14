import { AuthLayout } from '@/pages/_layout/auth';
import { SingIn } from '@/pages/auth/sing-in';
import { SingUp } from '@/pages/auth/sing-up';

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { AppLayout } from '@/pages/_layout/app';
import { Dashboard } from '@/pages/app/dashboard';
import { Texts } from '@/pages/app/text';
import { TextDetail } from '@/pages/app/text/text-detail';
import { TextStudy } from '@/pages/app/text/text-study';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/sign-in" replace /> },
      { path: '/sign-in', element: <SingIn /> },
      { path: '/sign-up', element: <SingUp /> },
    ]
  },
  {
    path: '/app',
    element: <PrivateRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'texts',
            element: <Texts />
          },
          {
            path: 'texts/:id',
            element: <TextDetail />
          },
          {
            path: 'texts/:textPartId/part/:partNumber/study/:idDoTexto',
            element: <TextStudy />
          },
          {
            path: 'modules',
            element: <div>Página que conterar todos os Módulos.</div>
          },
          {
            path: 'flashCards',
            element: <div>Página que conterar todos os Flash Cards.</div>
          },
        ]
      },
    ],
  }
])

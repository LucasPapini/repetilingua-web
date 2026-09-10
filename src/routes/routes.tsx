import { AuthLayout } from '@/pages/_layout/auth';
import { SingIn } from '@/pages/auth/sing-in';
import { SingUp } from '@/pages/auth/sing-up';

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { AppLayout } from '@/pages/_layout/app';
import { Dashboard } from '@/pages/app/dashboard';

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
          }
        ]
      },
    ],
  }
])

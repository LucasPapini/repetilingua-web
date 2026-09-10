import { AuthLayout } from '@/pages/_layout/auth';
import { SingIn } from '@/pages/auth/sing-in';
import { SingUp } from '@/pages/auth/sing-up';

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';

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
    element: <PrivateRoute />,
    children: [
      {
        path: '/app',
        element: <div className="p-4 text-black">Área logada do repetilngua!</div>,
      },
    ],
  }
])

import React from 'react'
import { RouteObject } from '@/routers/interface'
import { Navigate, useRoutes } from 'react-router-dom'
import Login from '@/views/login'

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/login' />,
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login',
    },
  },
]

const Router = () => {
  const routes = useRoutes(rootRouter)
  return routes
}

export default Router

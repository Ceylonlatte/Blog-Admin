import React from 'react'
import { RouteObject } from '@/routers/interface'
import { Navigate, useRoutes } from 'react-router-dom'
import Login from '@/containers/Login'

// * 导入所有router
const metaRouters = require.context('./modules', true, /\.tsx$/)

console.log('metaRouters', metaRouters)

// * 处理路由
export const routerArray: RouteObject[] = []

metaRouters
  .keys()
  .reverse()
  .forEach((modulePath) => {
    routerArray.push(...metaRouters(modulePath).default)
  })
console.log(routerArray)

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/home' />,
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
  ...routerArray,
  {
    path: '*',
    element: <Navigate to='/404' />,
  },
]

console.log(rootRouter)

const Router = () => {
  const routes = useRoutes(rootRouter)
  return routes
}

export default Router

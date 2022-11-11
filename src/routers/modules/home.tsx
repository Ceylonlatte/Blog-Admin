import React from 'react'
import Layout from '@/containers/Layout'
import { RouteObject } from '../interface'
import Home from '@/containers/Home'

const HomeRouter: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/home/index',
        // element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
        element: <Home />,
        meta: {
          requiresAuth: true,
          title: '首页',
          key: 'home',
        },
      },
    ],
  },
]

export default HomeRouter

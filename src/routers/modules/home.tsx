import React from 'react'
import Layout from '@/containers/Layout'
import { RouteObject } from '../interface'
import Home from '@/containers/Home'

const HomeRouter: RouteObject[] = [
  {
    element: <Layout />,
    path: '/',
    children: [
      {
        path: '/home',
        icon: 'HomeOutlined',
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

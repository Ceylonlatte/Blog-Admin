import React from 'react'
import Layout from '@/containers/Layout'
import { RouteObject } from '../interface'
import Category from '@/containers/Category'

const CategoryRouter: RouteObject[] = [
  {
    element: <Layout />,
    path: '/',
    children: [
      {
        element: <Category />,
        path: '/category',
        icon: 'AppstoreAddOutlined',
        meta: {
          requiresAuth: true,
          title: '栏目',
          key: 'category',
        },
      },
    ],
  },
]

export default CategoryRouter

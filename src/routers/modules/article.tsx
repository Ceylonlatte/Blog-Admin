import React from 'react'
import Layout from '@/containers/Layout'
import { RouteObject } from '../interface'
import Article from '@/containers/Article'

const ArticleRouter: RouteObject[] = [
  {
    element: <Layout />,
    path: '/',
    children: [
      {
        element: <Article />,
        path: '/article',
        icon: 'ReadOutlined',
        meta: {
          requiresAuth: true,
          title: '文章',
          key: 'article',
        },
      },
    ],
  },
]

export default ArticleRouter

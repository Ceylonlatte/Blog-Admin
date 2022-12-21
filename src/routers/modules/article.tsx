import React from 'react'
import Layout from '@/containers/Layout'
import { RouteObject } from '../interface'
import Article from '@/containers/Article'
import ArticleDetail from '@/containers/Article/ArticleDetail'
import CreateArticle from '@/containers/Article/CreateArticle'

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
      {
        element: <ArticleDetail />,
        path: '/article/:id',
        meta: {
          hidden: true,
          requiresAuth: true,
          title: '文章详情',
          key: 'articleDetail',
        },
      },
      {
        element: <CreateArticle />,
        path: '/create-article',
        meta: {
          hidden: true,
          requiresAuth: true,
          title: '创建文章',
          key: 'createArticle',
        },
      },
    ],
  },
]

export default ArticleRouter

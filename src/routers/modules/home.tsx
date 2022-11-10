import React from 'react'
import Layout from '@/containers/Layout'
import { RouteObject } from '../interface'

const HomeRouter: RouteObject[] = [
  {
    element: <Layout />,
    path: '/home/index',
  },
]

export default HomeRouter

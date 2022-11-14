import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import LayoutHeader from './Header'

const { Content } = Layout

const AppLayout: React.FC = () => {
  return (
    <Layout>
      <LayoutHeader />
      <Content>
        <Outlet></Outlet>
      </Content>
    </Layout>
  )
}
export default AppLayout

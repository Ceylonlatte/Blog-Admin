import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout

const AppLayout: React.FC = () => {
  return (
    <Layout>
      <Content>
        <Outlet></Outlet>
      </Content>
    </Layout>
  )
}
export default AppLayout

import { collapseAtom } from '@/stores'
import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import LayoutHeader from './Header'
import LayoutMenu from './Menu'
import style from './layout.module.less'

const { Sider, Content } = Layout

const AppLayout: React.FC = () => {
  const [collapse, setCollapse] = useRecoilState(collapseAtom)

  return (
    <Layout className={style.baseLayout}>
      <Sider trigger={null} collapsible collapsed={collapse}>
        <LayoutMenu />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Content>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}
export default AppLayout

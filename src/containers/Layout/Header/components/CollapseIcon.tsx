import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { collapseAtom } from '@/stores'
import React from 'react'
import { useRecoilState } from 'recoil'

const CollapseIcon: React.FC = () => {
  const [collapse, setCollapse] = useRecoilState(collapseAtom)

  const switchCollapse = () => {
    setCollapse((prevStatus) => !prevStatus)
  }

  return (
    <div onClick={switchCollapse}>
      {collapse ? <MenuUnfoldOutlined id='isCollapse' /> : <MenuFoldOutlined id='isCollapse' />}
    </div>
  )
}

export default CollapseIcon

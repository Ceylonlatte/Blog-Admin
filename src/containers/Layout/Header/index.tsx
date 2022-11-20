import { userInfoSelector } from '@/stores'
import { Layout } from 'antd'
import React from 'react'
import { useRecoilValue } from 'recoil'
import AvatarIcon from './components/AvatarIcon'
import CollapseIcon from './components/CollapseIcon'
import styles from './index.module.less'

const LayoutHeader = () => {
  const { Header } = Layout
  const userInfo = useRecoilValue(userInfoSelector)

  return (
    <Header className={styles.layoutHeader}>
      <div className={styles.headerLf}>
        <CollapseIcon />
      </div>
      <div className={styles.headerRi}>
        <span className={styles.username}>{userInfo.name}</span>
        <AvatarIcon />
      </div>
    </Header>
  )
}

export default LayoutHeader

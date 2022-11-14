import { GetUserInfo } from '@/api'
import { userInfoAtom } from '@/stores'
import { Layout } from 'antd'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import AvatarIcon from './components/AvatarIcon'
import CollapseIcon from './components/CollapseIcon'
import styles from './index.module.less'

const LayoutHeader = () => {
  const { Header } = Layout
  const [userInfo] = useRecoilState(userInfoAtom)
  const user = useEffect(() => {
    const getUserData = async () => {
      await GetUserInfo()
    }
    getUserData().catch(console.error)
  }, [])

  console.log(user)

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

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Dropdown, Modal } from 'antd'
import { useRecoilValue } from 'recoil'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { userInfoSelector } from '@/stores'
import { HOME_URL } from '@/constant'
import { LocalCache } from '@/utils'

const AvatarIcon: React.FC = () => {
  const navigate = useNavigate()

  const { avatar } = useRecoilValue(userInfoSelector)

  // 退出登录
  const logout = () => {
    Modal.confirm({
      title: '温馨提示 🧡',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        LocalCache.clear()
        navigate('/login')
      },
    })
  }

  const items = [
    { label: '首页', key: 'item-1', onClick: () => navigate(HOME_URL) }, // 菜单项务必填写 key
    { label: '退出登录', key: 'item-2', onClick: logout },
  ]

  return (
    <div>
      <Dropdown menu={{ items }} placement='bottom' arrow>
        <Avatar size='large' src={avatar} />
      </Dropdown>
    </div>
  )
}

export default AvatarIcon

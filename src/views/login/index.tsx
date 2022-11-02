import React from 'react'
import './index.less'
import loginBg from '@/assets/images/login-bg.png'
import LoginForm from './LoginForm'
import { Typography } from 'antd'

const Login: React.FC = () => {
  return (
    <div className='login'>
      <div className='login__box'>
        <img className='login__image' src={loginBg} alt='' />
        <div className='login__form'>
          <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
            Ant Design Pro
          </Typography.Title>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
export default Login

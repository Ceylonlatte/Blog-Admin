import React from 'react'
import styles from './index.module.less'
import loginBg from '@/assets/images/login-bg.png'
import LoginForm from './LoginForm'
import { Typography } from 'antd'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <img className={styles.leftImage} src={loginBg} alt='' />
        <div className={styles.loginFormWrap}>
          <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
            My Blog Admin
          </Typography.Title>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
export default Login

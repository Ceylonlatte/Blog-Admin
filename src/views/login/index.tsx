import React from 'react'
import './index.less'
import loginBg from '@/assets/images/login-bg.png'
import LoginForm from './LoginForm'

const Login: React.FC = () => {
  return (
    <div className='login'>
      <div className='login__box'>
        <img className='login__image' src={loginBg} alt='' />
        <div className='login__form'>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
export default Login

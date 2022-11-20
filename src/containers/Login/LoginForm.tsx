import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd'
import styles from './LoginForm.module.less'
import { LoginParam } from '@/types'
import { login } from '@/api/user'
import { LocalCache } from '@/utils'
import { HOME_URL, Token } from '@/constant'
import { useNavigate } from 'react-router-dom'

const LoginForm: React.FC = () => {
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (loginForm: LoginParam) => {
    try {
      setloading(true)
      const { refreshToken, accessToken } = await login(loginForm)

      LocalCache.setItem(Token.ACCESS_TOKEN, accessToken)
      LocalCache.setItem(Token.REFRESH_TOKEN, refreshToken)

      message.success('登录成功')

      navigate(HOME_URL)
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  return (
    <Form
      name='normal_login'
      className={styles.loginForm}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item name='name' rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Row justify={'space-between'}>
          <Col>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <a className='login-form-forgot' href=''>
              Forgot password
            </a>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button loading={loading} type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
        Or <a href=''>register now!</a>
      </Form.Item>
    </Form>
  )
}
export default LoginForm

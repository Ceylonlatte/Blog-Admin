import { LoginResponseData } from '@/types'
import { LocalCache } from './storage'
import { LOGIN_URL, Token } from '@/constant'
import { message } from 'antd'
import publicInstance from '@/service/public'

export const refreshToken = async (): Promise<LoginResponseData> => {
  try {
    const res = await publicInstance.post<any, any>('/auth/refresh', {
      refreshToken: LocalCache.getItem(Token.REFRESH_TOKEN),
    })

    const { accessToken = '', refreshToken = '' } = res?.data?.data

    if (accessToken) {
      LocalCache.setItem(Token.ACCESS_TOKEN, accessToken)
      LocalCache.setItem(Token.REFRESH_TOKEN, refreshToken)
    }

    return res?.data?.data
  } catch (error) {
    LocalCache.clear()
    message.error('抱歉，您的登录状态已失效，请重新登录！')
    window.location.href = '/'
    return Promise.reject(error)
  }
}

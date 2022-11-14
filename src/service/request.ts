// index.ts
import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
import { LocalCache, refreshToken } from '@/utils'
import { Token } from '@/constant'

const service: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_REQUEST_URL}/api`,

  timeout: 5000,
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log('请求成功拦截器', config)
    const accessToken = LocalCache.getItem(Token.ACCESS_TOKEN)

    console.log('accessToken', accessToken)

    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      }
    }
    return config
  },
  (error: AxiosError) => {
    console.log('请求失败拦截器', error)
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('响应成功拦截器', response.data.data)
    return response.data.data
  },
  async (error) => {
    console.log('响应失败拦截器', error)

    if (!error.response) {
      message.error('服务器出错啦~')
      return Promise.reject(error)
    }

    const config = error?.config

    console.log('config', config)

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true
      const result = await refreshToken()

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        }
      }

      return service(config)
    }

    const errorMsg =
      error.response.data.message instanceof Array
        ? error.response.data.message[0].message
        : error.response.data.message ?? error.message

    message.error(errorMsg ?? '未知错误')

    return Promise.reject(error)
  },
)

export default service

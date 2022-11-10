// index.ts
import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
import { LocalCache } from '@/utils'
import { Token } from '@/constant'

const service: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_REQUEST_URL}/api`,

  timeout: 5000,
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log('请求成功拦截器', config)
    const accessToken = LocalCache.getItem(Token.ACCESS_TOKEN)

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
  (error) => {
    const {
      response: { data },
    } = error

    const errorMessage =
      data.message instanceof Array ? data.message[0].message : data.message ?? error.message

    message.error(errorMessage ?? '请求错误')

    console.log('响应失败拦截器', error)
    console.log(errorMessage)
    return Promise.reject(error)
  },
)

export default service

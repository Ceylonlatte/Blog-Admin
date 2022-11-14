import { Request } from '@/service'
import { LoginParam, LoginType } from '@/types'

export const Login = (param: LoginParam) => {
  return Request<any, LoginType>({
    url: '/auth/login',
    method: 'post',
    data: param,
  })
}

export const GetUserInfo = () => {
  return Request<any, LoginType>({
    url: '/auth/getUserInfo',
    method: 'get',
  })
}

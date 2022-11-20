import { Request } from '@/service'
import { LoginParam, LoginResponseData, UserInfoParam } from '@/types'

export const login = (param: LoginParam) => {
  return Request<any, LoginResponseData>({
    url: '/auth/login',
    method: 'post',
    data: param,
  })
}

export const getUserInfo = () => {
  return Request<any, UserInfoParam>({
    url: '/auth/getUserInfo',
    method: 'get',
  })
}

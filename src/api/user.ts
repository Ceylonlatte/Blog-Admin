import { Request } from '@/service'
import { LoginParam, LoginResponse } from '@/types'

export const Login = (param: LoginParam) => {
  return Request<any, LoginResponse>({
    url: '/auth/login',
    method: 'post',
    data: param,
  })
}

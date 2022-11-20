import { Request } from '@/service'
import { LoginResponseData } from '@/types'

export const GetRefreshTokenApi = (param) => {
  return Request<any, LoginResponseData>({
    url: '/auth/refresh',
    method: 'post',
    data: param,
  })
}

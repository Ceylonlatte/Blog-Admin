import { Request } from '@/service'
import { LoginType } from '@/types'

export const GetRefreshTokenApi = (param) => {
  return Request<any, LoginType>({
    url: '/auth/refresh',
    method: 'post',
    data: param,
  })
}

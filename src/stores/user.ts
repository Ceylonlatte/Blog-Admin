import { UserInfoType } from '@/types'
import { atom } from 'recoil'

const defalutValue = {
  name: 'Anonyme',
  avatar: '',
}
export const userInfoAtom = atom<UserInfoType>({
  key: 'userInfo',
  default: defalutValue,
})

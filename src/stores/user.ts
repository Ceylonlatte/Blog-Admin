import { getUserInfo } from '@/api'
import { selector } from 'recoil'

export const userInfoSelector = selector({
  key: 'userInfoSelector',
  get: async () => {
    const response = await getUserInfo()
    return response
  },
})

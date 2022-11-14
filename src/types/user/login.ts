export interface LoginParam {
  name: string
  password: string
}

export interface LoginType {
  accessToken: string
  refreshToken: string
}

export interface UserInfoType {
  name: string
  avatar: string
}

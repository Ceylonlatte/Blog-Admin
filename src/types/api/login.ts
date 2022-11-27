export interface LoginParam {
  name: string
  password: string
}

export interface LoginResponseData {
  accessToken: string
  refreshToken: string
}

export interface UserInfoParam {
  name: string
  avatar: string
  [key: string]: string
}

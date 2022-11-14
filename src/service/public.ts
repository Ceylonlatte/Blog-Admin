import axios, { AxiosInstance } from 'axios'

const publicInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_REQUEST_URL}/api`,

  timeout: 5000,
})

export default publicInstance

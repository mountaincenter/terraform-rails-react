import axios from 'axios'

export const axiosInstance = axios.create()
axiosInstance.defaults.baseURL =
  process.env.NODE_ENV === "development" ?
  "http://localhost:3001" : "https://api.ymnk.fun"
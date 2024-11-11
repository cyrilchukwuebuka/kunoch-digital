import axios from 'axios'

import useGlobalStore, { ActiveUser } from '@/lib/store/global-store'

const baseURL = `${process.env.NEXT_PUBLIC_HOST_BASE_URL}`

const headers = {}

const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  config => {
    const store: ActiveUser | undefined = useGlobalStore().activeUser

    if (store?.token) {
      config.headers['Authorization'] = `Bearer ${store.token?.accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default axiosInstance

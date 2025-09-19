import axios from 'axios'
import { toast } from 'vue-sonner'

const ContentType = {
  urlencoded: 'application/x-www-form-urlencoded;charset=UTF-8',
  json: 'application/json',
  formData: 'multipart/form-data',
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

service.interceptors.request.use(
  (config) => {
    config.headers['Content-Type']
      = ContentType[config.data instanceof FormData ? 'formData' : 'json']
    return config
  },
  (err) => {
    Promise.reject(err)
  },
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    const { error, message } = err?.response?.data
    toast.error(error ?? message, {
      duration: 1500,
    })
    Promise.reject(err)
  },
)

export default service

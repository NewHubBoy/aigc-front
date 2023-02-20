import Axios from 'axios'
import { ResponseData } from '../type';
import { localAuth } from './storage';

const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_APP_API + '/api/v1',
  timeout: 5000,
})

axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求预处理
axiosInstance.interceptors.request.use(async (config) => {
  /**
   * 请求预处理
   * do something...
   */
  return config
}, (error) => {
  // 错误处理
  console.log(error)
  return Promise.reject(error);
})

// 响应预处理
axiosInstance.interceptors.response.use((config) => {
  /**
   *  响应预处理
   * do something...
   */
  return config
}, (error) => {
  console.log(error)
  return Promise.reject(error);
})


// 提供 SWR 使用的 fetcher
export const get = async (url: string, _data?: object): Promise<ResponseData> => {
  const { data } = await axiosInstance({ method: 'get', url, params: _data, headers: { 'Authorization': localAuth() } })
  return data
}

export const post = async (url: string, _data?: object): Promise<ResponseData> => {
  const { data } = await axiosInstance({ method: 'post', url, data: _data, headers: { 'Authorization': localAuth() } })
  return data
}
const _formDat = new FormData()
type formData = typeof _formDat


export const postForm = async (url: string, _data: formData): Promise<ResponseData> => {
  const { data } = await axiosInstance({ method: 'post', url, data: _data, headers: { 'Authorization': localAuth(), "Content-Type": "multipart/form-data" } })
  return data
}


export default axiosInstance

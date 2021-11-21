import axios from 'axios'
import  { Cookies } from 'react-cookie'
import config from 'config/config'


function setAccessToken(config: any){
  const accessToken = new Cookies().get('accessToken') || ''
  config.headers.Authorization =  `Bearer ${accessToken}`  
  return config
}

function successNormalization(response: any) {
  const { data } = response.data as any
  return data;
}

function errorNormalization(error: any) {
  
  return Promise.reject({ 
    errors: error.response?.data?.errors || [], 
    status: error.response?.status,
    errorObject: error
  })
}

const axiosInstance = axios.create({
  baseURL: config.serverURL,
})

axiosInstance.interceptors.response.use(successNormalization, errorNormalization);
axiosInstance.interceptors.request.use(setAccessToken);

export default axiosInstance;

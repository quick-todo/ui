import axios from 'axios'
import  { Cookies } from "react-cookie";


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
    errors: error?.response?.data?.errors || [], 
    errorObject: error
  })
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080'
})

axiosInstance.interceptors.response.use(successNormalization, errorNormalization);
axiosInstance.interceptors.request.use(setAccessToken);

export default axiosInstance;

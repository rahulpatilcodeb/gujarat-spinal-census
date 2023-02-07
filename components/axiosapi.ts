import axios, { AxiosRequestConfig } from 'axios';
import { useSelector } from "react-redux";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com",
});



// const addTokenToHeader = (config: AxiosRequestConfig) => {
//     const {token:jtoken}=useSelector((state:RootState)=>(state.users))
//     config.headers['Authorization'] = `Bearer ${jtoken}`;
//     return config;
//   };
  
//   axiosInstance.interceptors.request.use(
//     addTokenToHeader as any,
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  
export default axiosInstance;

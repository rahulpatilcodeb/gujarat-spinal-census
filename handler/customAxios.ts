import axios from "axios";
import { store } from "@/store/store";
// const axios = require('axios');
// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const customAxios = axios.create({
  //   baseURL: `${process.env.REACT_APP_API_URL}`,
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000,
});
// Step-2: Create request, response & error handlers
const requestHandler = (request: any) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  if (store.getState().users.islogin) {
    request.headers.Authorization = `${store.getState().users.token}`;
  }
  return request;
};
const responseHandler = (response: any) => {
  if (response.status === 401) {
    window.location.pathname = "/admin/login";
  }
  return response.data;
};
const errorHandler = (error: any) => {
  if (error.response.status === 401) {
    window.location.pathname = "/admin/login";
  }
  return Promise.reject(
    error?.response?.data?.message || error?.response?.data || error
  );
};
// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);
customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;

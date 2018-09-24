import axios from 'axios'
import $toast from '../components/common/toast.js'

// http request 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers.ContentType = 'application/json;charset=UTF-8';
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 服务器响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
            $toast({position: 'top', message: '404出错了~'});
            break;
        case 500:
            $toast({position: 'top', message: '500出错了~'});
            break;
        default:
            $toast({position: 'top', message: error.response.status+'出错了~'});
            break;
      }
    }
    return Promise.reject(error.response.data)
  });
export default axios;

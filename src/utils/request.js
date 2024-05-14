import axios from 'axios';

// 创建一个axios实例
const http = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000,
});

// 自定义拦截器：请求拦截器
http.interceptors.request.use(config => {
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 自定义拦截器：响应拦截器
http.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response.data;
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 判断是否在服务器端运行
function isServer() {
    return typeof window === 'undefined';
}

// 根据环境创建不同的请求方法
export const request = isServer() ? http : http;

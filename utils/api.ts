import axios from 'axios';

const BASE_URL = 'http://0.0.0.0:8000'; // 后端接口地址

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 从本地存储获取 token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // 设置请求头
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 添加响应拦截器
apiClient.interceptors.response.use((response) => {
  return response.data; // 直接返回数据
}, (error) => {
  const { response } = error;
  if (response) {
    switch (response.status) {
      case 400:
        alert('请求错误，请检查输入');
        break;
      case 401:
        alert('未授权，请登录');
        break;
      case 403:
        alert('没有权限访问该资源');
        break;
      case 404:
        alert('请求的资源未找到');
        break;
      case 500:
        alert('服务器错误，请稍后再试');
        break;
      default:
        alert('发生未知错误');
    }
  } else {
    alert('网络错误，请检查您的连接');
  }
  return Promise.reject(error);
});

// 导出 Axios 实例
export default apiClient; 
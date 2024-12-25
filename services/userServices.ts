import apiClient from '../utils/api'; // 导入 Axios 实例
import { ApiResponse, ApiResponseHandler, LoginResponse } from '../utils/response'; // 导入响应处理类
import qs from 'qs'; // 导入 qs 库
// 登录请求
export const login = async (email: string, password: string) => {
  const response = await apiClient.post<ApiResponse<{ access_token: string }>>('/auth/jwt/login', 
    qs.stringify({
      grant_type: 'password', // 添加 grant_type
      username: email,        // 使用 email 作为 username
      password: password,     // 密码
      scope: '',              // 可选，传递空字符串或根据需要设置
      client_id: ''          // 可选，传递空字符串或根据需要设置
    }), 
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // 设置请求头
      },
    }
  ) as LoginResponse;
   return response; // 返回 access_token
};

// 注册请求
export const register = async (email: string, password: string) => {
  const response = await apiClient.post<ApiResponse<null>>('/register', { email, password });
  const handler = new ApiResponseHandler(response.data);
  
  if (handler.isSuccess()) {
    return handler.getData(); // 返回 null
  } else {
    throw new Error(handler.getErrorMessage()); // 抛出错误信息
  }
};

// 登出请求 
export const logout = async () => {
  const token = localStorage.getItem('token');
  const response = await apiClient.post('/auth/jwt/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

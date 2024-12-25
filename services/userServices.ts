import axios from 'axios';
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

// 发送注册验证码
export const sendRegistrationCode = async (email: string) => {
  try {
    const response = await apiClient.post(`/auth/register/send-code?email=${encodeURIComponent(email)}`,
      {},
      {
        headers: {
          "Content-Type": "application/json", // 设置请求头
        },
      }
    ) as ApiResponse<null>;
    return response; // 返回响应数据
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('发送验证码失败:', error.response.data); // Log the error response
    } else {
      console.error('发送验证码失败:', error);
    }
    throw error; // 抛出错误以便在调用处处理
  }
};


// 邮箱验证码注册
export const registrationByCode = async (email: string, code: string) => {
  try {
    const json =  {
      "email": email,
      "code": code,
      "user_create": {
        "email": email,
        "password": localStorage.getItem('reg_pwd'),
        "is_active": true,
        "is_superuser": false,
        "is_verified": false
      }
    }
    const response = await apiClient.post(`/auth/register/verify`,
      {
        "email": email,
        "code": code,
        "user_create": {
          "email": email,
          "password": localStorage.getItem('reg_pwd'),
          "is_active": true,
          "is_superuser": false,
          "is_verified": false
        }
      },
      {
        headers: {
          "Content-Type": "application/json", // 设置请求头
        },
      }
    ) as ApiResponse<null>;

    return response; // 返回响应数据
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('注册失败:', error.response.data); // Log the error response
    } else {
      console.error('注册失败:', error);
    }
    throw error; // 抛出错误以便在调用处处理
  }
};

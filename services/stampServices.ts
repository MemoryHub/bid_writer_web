import { ApiResponse, StampedResponse } from '@/utils/response';
import apiClient from '../utils/api'; // Import your Axios instance
import axios from 'axios';

// 获取印章列表
export const getStampList = async () => {
    const token = localStorage.getItem('token'); // 从localStorage获取token
    try {
        const response = await apiClient.get('/stamp/list-images', {
            headers: {
                Authorization: `Bearer ${token}`, // 将token添加到请求头
            },
        }) as ApiResponse<null>; // 调用获取印章列表的接口
        return response.data; // 返回印章列表数据
    } catch (error) {
        console.error('获取印章列表失败:', error);
    }
};

// 批量删除印章
export const deleteStampBatch = async (imageIds: number[]) => {
    const token = localStorage.getItem('token'); // 从localStorage获取token
    try {
        const response = await apiClient.post('/stamp/delete-images', imageIds, {
            headers: {
                Authorization: `Bearer ${token}`, // 将token添加到请求头
                'Content-Type': 'application/json', // 设置请求头
            },
        }) as ApiResponse<null>;
        return response; // 返回删除结果
    } catch (error) {
        console.error('删除印章失败:', error);
    }
};

// 批量上传印章图片
export const uploadMultipleStamp = async (images: File[]) => {
    const formData = new FormData();
    
    // Append each file to the FormData object
    images.forEach(image => {
      formData.append('images', image); // Adjust the key based on your API requirements
    });
  
    try {
      const response = await apiClient.post('/stamp/upload-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type
        },
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error('印章图片上传失败:', error);
    }
  };

// 印章生成接口
export const createStamped = async (input_file_path: string,stamp_file_path: string,stamp_type:string = 'both') => {
  const token = localStorage.getItem('token'); // 从localStorage获取token
  try {
    const response = await apiClient.post(`/stamp/smart-stamp?input_file=${(input_file_path)}&stamp_file=${(stamp_file_path)}&stamp_type=${(stamp_type)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // 将token添加到请求头
        },
      }
    ) as StampedResponse;
    return response; // 返回响应数据
  } catch (error) {
    console.error('印章生成失败:', error);
  }
};

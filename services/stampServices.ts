import { ApiResponse } from '@/utils/response';
import apiClient from '../utils/api'; // Import your Axios instance

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
        throw error; // 重新抛出错误以便其他地方可以处理
    }
};

// 批量删除印章
export const deleteStampBatch = async (imageIds: number[]) => {
    const token = localStorage.getItem('token'); // 从localStorage获取token
    try {
        const response = await apiClient.delete('/stamp/delete-images', {
            headers: {
                Authorization: `Bearer ${token}`, // 将token添加到请求头
            },
            data: { ids: imageIds }, // 发送要删除的印章ID数组
        }) as ApiResponse<null>;
        return response.data; // 返回删除结果
    } catch (error) {
        console.error('删除印章失败:', error);
        throw error; // 重新抛出错误以便其他地方可以处理
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
      throw error; // Rethrow the error for handling in the calling function
    }
  };
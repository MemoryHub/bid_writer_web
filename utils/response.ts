import { AxiosResponse } from "axios";

export interface ApiResponse<T> {
  code: number; // 状态码
  message: string; // 提示信息
  data?: T; // 可选的数据字段
}

/**
 * 处理 API 响应
 */
export class ApiResponseHandler<T> {
  private response: ApiResponse<T>;

  constructor(response: ApiResponse<T>) {
    this.response = response;
  }

  // 检查请求是否成功
  isSuccess(): boolean {
    return this.response.code === 200;
  }

  // 获取数据
  getData(): T | null {
    return this.isSuccess() ? this.response.data || null : null;
  }

  // 获取错误信息
  getErrorMessage(): string {
    return this.response.message;
  }
} 

export interface LoginResponse extends AxiosResponse{
  access_token: string;
  token_type: string;
}
'use client' // 指定该组件为客户端组件


import React, { useEffect } from 'react'; // 导入 React 库
import { FilePond, registerPlugin } from 'react-filepond'; // 导入 FilePond 组件和注册插件的函数
import 'filepond/dist/filepond.min.css'; // 导入 FilePond 的样式
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type' // 导入文件类型验证插件
import { uploadMultipleFiles } from '@/services/uploadServices'; // 导入上传文件的服务函数
import { FilePondFile } from 'filepond';

// 注册文件类型验证插件
registerPlugin(FilePondPluginFileValidateType)

// 定义组件的属性接口
interface DropUploadButtonProps {
  text: string;
  onFileSelect: (files: File[]) => void; // 处理文件选择的回调函数
}

// 定义 DropUploadButton 组件
const DropUploadButton: React.FC<DropUploadButtonProps> = ({ text,onFileSelect }) => {
  
  useEffect(() => {
    // 当组件加载时，隐藏 filepond--credits 元素   去掉底部水印
    const credits = document.querySelector('.filepond--credits') as HTMLElement; // Type assertion to HTMLElement
    if (credits) {
      credits.style.display = 'none';
    }
  }, []);


  // 处理文件上传的函数
  const handleFileUpload = async (files: File[], load: (file: string | { [key: string]: any }) => void, uploadError: (err: any) => void) => {
    try {
      // 调用上传函数处理实际的文件上传
      const response = await uploadMultipleFiles(files);
      load(response); // 上传完成后调用 load 函数
      // console.log('Files uploaded successfully:', response); // 打印上传成功的文件信息
      onFileSelect(response); // 将选择的文件传递给父组件
    } catch (error) {
      console.error('Error uploading files:', error); // 打印上传错误信息
      uploadError('上传失败'); // 调用 error 函数，传递错误信息
    }
  };

  const handleRemoveFile = (file: FilePondFile) => {
    console.log('文件已被移除:', file);
    onFileSelect([]); // 将选择的文件传递给父组件
    // 添加你希望的逻辑，比如通知服务器删除文件
  };
  
  return (
    <FilePond
      allowMultiple={true} // 允许上传多个文件
      maxFiles={1} // 限制最多上传文件数量为 1
      acceptedFileTypes={['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']} // 接受的文件类型为 PDF, DOCX 和 DOC
      labelIdle={text} // 空闲状态下的提示信息
      labelFileProcessing='上传中...' // 文件上传中的提示信息
      labelFileProcessingComplete='上传完毕' // 文件上传完成后的提示信息
      labelFileProcessingError='上传失败' // 文件上传失败后的提示信息
      onremovefile={(error,file) => {
        handleRemoveFile(file);
      }}
      server={{
        // 处理文件上传的服务器配置
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
          const files = [file as File]; // 将单个文件转换为数组
          handleFileUpload(files, load, error); // 调用文件上传处理函数
          // 返回一个取消上传的函数
          return {
            abort: () => {
              console.log('文件上传被取消'); // 打印取消上传的信息
            }
          };
        },
      }}
    />
  );
};

export default DropUploadButton; // 导出 DropUploadButton 组件
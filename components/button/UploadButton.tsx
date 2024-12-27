'use client'

import { useState } from 'react'
import Alert from '../alert/Alert'
import { uploadMultipleFiles } from '@/services/uploadServices'

interface UploadButtonProps {
  width?: string;
  text?: string;
  allowedTypes?: string[];
  loading?: boolean;
  onChange?: (files: File[]) => void;
}

export default function UploadButton({ width, text, allowedTypes, loading, onChange }: UploadButtonProps) {
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMsg, setAlertMsg] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const fileArray = Array.from(files)
    // 默认值
    const validAllowedTypes = allowedTypes || ['.png', '.jpg', '.jpeg', '.pdf', '.docx'];
    const invalidFiles = fileArray.filter(file => {
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      return !validAllowedTypes.includes(fileExtension);
    });

    if (invalidFiles.length > 0) {
      setAlertType('error');
      setAlertTitle('错误')
      setAlertMsg('只支持' + allowedTypes?.join(', ') + '格式的文件')
      setShowAlert(true)
      e.target.value = '' // 清空选择
      return
    }

    // 检查文件大小（300MB = 300 * 1024 * 1024 bytes）
    const maxSize = 300 * 1024 * 1024
    const oversizedFiles = fileArray.filter(file => file.size > maxSize)

    if (oversizedFiles.length > 0) {
      setAlertType('error')
      setAlertTitle('错误')
      setAlertMsg('文件大小不能超过 300MB')
      setShowAlert(true)
      e.target.value = '' // 清空选择
      return
    }


    onChange?.(fileArray)
  }

  return (
    <>
      <label 
        htmlFor="file-upload"
        className="inline-flex justify-center items-center gap-x-2 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-[100px] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 cursor-pointer py-1 px-1 transition-all duration-300 ease-in-out min-w-[120px]"
        style={width ? { width } : undefined}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
            <span className="ml-2 text-xs">加载中...</span>
          </div>
        ) : (
          <>
            <svg 
              className="shrink-0 w-4 h-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
              />
            </svg>
            
            <span className="text-xs">{text}</span>
          </>
        )}
        <input 
          id="file-upload" 
          type="file"
          className="sr-only"
          accept={allowedTypes?.join(', ')}
          disabled={loading} // 禁用按钮
          multiple // 允许选择多个文件
          onChange={handleFileChange}
        />
      </label>

      {showAlert && (
        <Alert
          type={alertType}
          title={alertTitle}
          msg={alertMsg}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  )
} 
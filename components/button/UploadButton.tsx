'use client'

import { useState } from 'react'
import TaskAlert from '../TaskAlert'

interface UploadButtonProps {
  onFileSelect?: (file: File) => void;
  width?: string;
}

export default function UploadButton({ onFileSelect, width }: UploadButtonProps) {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 检查文件类型
    const allowedTypes = ['.pdf', '.docx']
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'))
    if (!allowedTypes.includes(fileExtension)) {
      setAlertMessage('只支持 PDF 和 DOCX 格式的文件')
      setShowAlert(true)
      e.target.value = '' // 清空选择
      return
    }

    // 检查文件大小（300MB = 300 * 1024 * 1024 bytes）
    const maxSize = 300 * 1024 * 1024
    if (file.size > maxSize) {
      setAlertMessage('文件大小不能超过 300MB')
      setShowAlert(true)
      e.target.value = '' // 清空选择
      return
    }

    // 如��验证通过，调用回调函数
    onFileSelect?.(file)
  }

  return (
    <>
      <TaskAlert 
        show={showAlert} 
        setShow={setShowAlert}
        title={"上传发生错误"}
        msg={alertMessage}
      />
      <label 
        htmlFor="file-upload"
        className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-md font-medium rounded-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 cursor-pointer py-3 px-4 transition-all duration-300 ease-in-out min-w-[180px]"
        style={width ? { width } : undefined}
      >
        <svg 
          className="shrink-0 w-6 h-6" 
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
        上传文件
        <input 
          id="file-upload" 
          type="file"
          className="sr-only"
          accept=".pdf,.docx"
          onChange={handleFileChange}
        />
      </label>
    </>
  )
} 
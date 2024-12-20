'use client'

import Header from '../components/header/Header'
import UploadButton from '../components/button/UploadButton'
import '../app/globals.css'

export default function MagicStamp() {
  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file)
    // 处理文件上传逻辑
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <div className="flex-1 py-10">
        <div className="max-w-2xl mx-auto px-4">
          <UploadButton onFileSelect={handleFileSelect} />
        </div>
      </div>
    </div>
  )
}

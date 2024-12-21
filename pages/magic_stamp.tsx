'use client'

import { useState, useRef, useEffect } from 'react'
import Header from '../components/header/Header'
import UploadButton from '../components/button/UploadButton'
import '../app/globals.css'

export default function MagicStamp() {
  const [splitPosition, setSplitPosition] = useState(50) // 默认50%
  const isDragging = useRef(false)
  const splitContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    isDragging.current = true
    document.body.style.cursor = 'col-resize'
    // 防止拖动时选中文本
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !splitContainerRef.current) return

      const containerRect = splitContainerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const mouseX = e.clientX - containerRect.left
      const newPosition = (mouseX / containerWidth) * 100

      // 限制拖动范围在20%到80%之间
      if (newPosition >= 20 && newPosition <= 80) {
        setSplitPosition(newPosition)
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file)
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#212121]">
      <Header />

      {/* 内容部分 */}
      <div className="flex-1 flex flex-col">


        {/* 分割区域 */}
        <div
          ref={splitContainerRef}
          className="flex-1 flex relative"
        >
          {/* 左侧面板 */}
          <div
            className="bg-[#212121] overflow-auto"
            style={{ width: `${splitPosition}%` }}
          >
            <div className="h-full flex flex-col">
              {/* 上部分文字区域 */}
              <div className="px-20 pt-20">
                <h1 className="text-white font-bold w-full
                  tablet:text-3xl 
                  mobile:text-xl 
                  text-lg
                  mb-8"
                >
                  魔法印章
                </h1>
                <p className="text-gray-300 mb-8 w-full
                  tablet:text-base
                  mobile:text-sm
                  text-xs"
                >
                  一键盖章，支持一键加盖整本印章，一键加盖骑缝章。从此告别繁琐的手动盖章，让AI为你节省时间。
                </p>
              </div>

              {/* 上传按钮区域 */}
              <div className="flex-1 flex items-start justify-center pt-10">
                <div className="px-20 w-full">
                  <div className="flex justify-center">
                    <UploadButton 
                      onFileSelect={handleFileSelect} 
                      width="60%"
                    />
                  </div>
                </div>
              </div>

              {/* 预留底部空间 */}
              <div className="flex-1"></div>
            </div>
          </div>

          {/* 分割线 */}
          <div
            className="w-[5px] relative cursor-col-resize group"
            onMouseDown={handleMouseDown}
          >
            {/* 渐变背景分割线 */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-80" />

            {/* 拖动把手 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[200px] bg-gradient-to-b from-transparent via-gray-600 to-transparent opacity-80 group-hover:via-gray-500 transition-colors" />
          </div>

          {/* 右侧面板 */}
          <div
            className="bg-[#212121] overflow-auto"
            style={{ width: `${100 - splitPosition}%` }}
          >
            <div className="p-4">
              {/* 右侧内容 */}
              右侧内容区域
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

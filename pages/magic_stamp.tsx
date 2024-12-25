'use client'

import { useState, useRef, useEffect } from 'react'
import Header from '../components/header/Header'
import UploadButton from '../components/button/UploadButton'
import '../app/globals.css'

/**
 * 魔法印章组件
 * 功能：
 * 1. 提供可拖动分割的左右两个面板
 * 2. 根据设备类型和面板宽度自动显示/隐藏内容
 * 3. 支持文件上传功能
 */
export default function MagicStamp() {
  // ==================== 状态管理 ====================
  const [splitPosition, setSplitPosition] = useState(50)  // 分割线位置，默认50%
  const [showLeftBlur, setShowLeftBlur] = useState(false)  // 左侧面板模糊状态
  const [showRightBlur, setShowRightBlur] = useState(false)  // 右侧面板模糊状态
  const [isMobile, setIsMobile] = useState(false)  // 设备类型标识
  const isDragging = useRef(false)  // 拖动状态标识
  const splitContainerRef = useRef<HTMLDivElement>(null)  // 分割容器引用

  // ==================== 设备检测 ====================
  /**
   * 检测设备类型并监听窗口大小变化
   * 目的：根据屏幕宽度判断是否为移动设备，以应用不同的阈值
   */
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768)  // 768px作为移动设备断点
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // ==================== 拖动处理 ====================
  /**
   * 处理分割线拖动开始
   * 目的：初始化拖动状态，设置鼠标样式，禁用文本选择
   */
  const handleMouseDown = () => {
    isDragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  /**
   * 处理分割线拖动过程
   * 目的：
   * 1. 跟踪鼠标移动更新分割线位置
   * 2. 限制拖动范围在20%-80%之间
   * 3. 清理拖动结束状态
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !splitContainerRef.current) return

      const containerRect = splitContainerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const mouseX = e.clientX - containerRect.left
      const newPosition = (mouseX / containerWidth) * 100

      // 限制拖动范围
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

  // ==================== 模糊效果控制 ====================
  /**
   * 监听分割位置变化，控制模糊效果
   * 目的：
   * 1. 当面板宽度小于阈值时显示模糊效果
   * 2. 移动端和桌面端使用不同阈值（移动端45%，桌面端25%）
   */
  useEffect(() => {
    const checkWidth = () => {
      const threshold = isMobile ? 45 : 25
      // 检查左侧区域宽度
      if (splitPosition < threshold) {
        setShowLeftBlur(true)
      } else {
        setShowLeftBlur(false)
      }
      
      // 检查右侧区域宽度
      if ((100 - splitPosition) < threshold) {
        setShowRightBlur(true)
      } else {
        setShowRightBlur(false)
      }
    }
    checkWidth()
  }, [splitPosition, isMobile])

  // ==================== 文件处理 ====================
  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file)
  }

  // ==================== 渲染UI ====================
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
            className="bg-[#212121] overflow-auto relative"
            style={{ width: `${splitPosition}%` }}
          >
            {/* 左侧模糊背景层 */}
            {showLeftBlur && (
              <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-10 flex items-center justify-center">
                <div className="text-white/50 text-sm">内容已隐藏</div>
              </div>
            )}
            
            {/* 原有内容 */}
            <div className={`h-full flex flex-col ${showLeftBlur ? 'invisible' : ''}`}>
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
                  一键加盖整本印章，一键加盖骑缝章。告别繁琐的手动盖章。
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
            className="bg-[#212121] overflow-auto relative"
            style={{ width: `${100 - splitPosition}%` }}
          >
            {/* 右侧模糊背景层 */}
            {showRightBlur && (
              <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-10 flex items-center justify-center">
                <div className="text-white/50 text-sm">内容已隐藏</div>
              </div>
            )}
            
            {/* 右侧原有内容 */}
            <div className={`h-full flex flex-col ${showRightBlur ? 'invisible' : ''}`}>
              <div className="p-4">
                右侧内容区域
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

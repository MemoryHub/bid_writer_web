'use client'

import { useState } from 'react'
import Header from '../components/header/Header'
import '../app/globals.css'
import SplitContainer from '@/components/splitcontainer/SplitContainer'
import Modal from '@/components/modal/Modal'
import UploadButton from '@/components/button/UploadButton'
import DropUploadButton from '@/components/button/DropUploadButton'

/**
 * 魔法印章组件
 * 功能：
 * 1. 提供可拖动分割的左右两个面板
 * 2. 根据设备类型和面板宽度自动显示/隐藏内容
 * 3. 支持文件上传功能
 */
export default function MagicStamp() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // ==================== 文件处理 ====================
  const handleFileSelect = (filePaths: File[]) => {
    if (filePaths.length > 0) {
      console.log('Selected files:', filePaths[0])
    }
  }

  // ==================== 左侧面板内容 ====================
  const left_container = (
    <>
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
          <DropUploadButton onFileSelect={handleFileSelect} />
        </div>
      </div>

      {/* 预留底部空间 */}
      <div className="flex-1"></div>
    </>
  )

  // ==================== 右侧面板内容 ====================
  const right_container = (
    <>
      <div className="p-4">

        <div className="flex justify-center">
          <UploadButton
            width="60%"
          />
        </div>
      </div>
    </>
  )

  // ==================== 渲染UI ====================
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#212121]">
      <Header />

      <SplitContainer
        left_container={left_container}
        right_container={right_container}
      />
      <Modal
        isOpen={isModalOpen}
        onSubmit={() => { }}
        submitText="去登录"
        title="去登录"
        content="content"
      />
    </div>
  )
}

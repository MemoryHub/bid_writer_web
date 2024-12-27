'use client'

import { useState, useEffect } from 'react'
import Header from '../components/header/Header'
import '../app/globals.css'
import SplitContainer from '@/components/splitcontainer/SplitContainer'
import Modal from '@/components/modal/Modal'
import DropUploadButton from '@/components/button/DropUploadButton'
import StampManage from './stamp_manage/stamp_manage'
import SubmitButton from '@/components/button/SubmitButton'
import InputFloatingLabel from '@/components/input/InputFloatingLabel'

/**
 * 魔法印章组件
 * 功能：
 * 1. 提供可拖动分割的左右两个面板
 * 2. 根据设备类型和面板宽度自动显示/隐藏内容
 * 3. 支持文件上传功能
 */
export default function MagicStamp() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false); // 添加 loading 状态
  const [disabled, setDisabled] = useState(true); // 添加 disabled 状态
  const [valueWidth, getValueWidth] = useState(40);
  const [valueOffset, getValueOffset] = useState(128);
  const [stampPath, setStampPath] = useState('');
  const [sealType, setSealType] = useState('全部'); // 存储选中的印章类型
  const [fileList, setFileList] = useState<File[]>([]);

  // 监听条件变化，更新disabled状态
  useEffect(() => {
    const isWidthValid = valueWidth > 0;
    const isOffsetValid = valueOffset > 0;
    const isStampPathValid = stampPath !== '';
    const isSealTypeSelected = sealType !== '';
    const isFileListValid = fileList.length > 0;
    setDisabled(!(isWidthValid && isOffsetValid && isStampPathValid && isSealTypeSelected && isFileListValid));
  }, [valueWidth, valueOffset, stampPath, sealType, fileList]);

  const handleSubmit = async (e: React.FormEvent) => {
    // 提交逻辑
  }

  // ==================== 文件处理 ====================
  const handleFileSelect = (filePaths: File[]) => {
    if (filePaths.length > 0) {
      console.log('Selected files:', filePaths[0])
      setFileList(filePaths);
    }else{
      setFileList([]);
    }
  }

  const handleImageSelect = (index: number, path: string) => {
    console.log('Selected Image Index:', index);
    console.log('Selected Image Path:', path);
    setStampPath(path);
    // 在这里可以处理选中的图片，例如更新状态或发送请求
  };

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
                  mobile:text-sm"
        >
          一键加盖整本印章，一键加盖骑缝章。告别繁琐的手动盖章。
        </p>

        <p className="text-gray-300 mb-8 w-full
                  tablet:text-sm
                  mobile:text-xs"
        >
          上传目标文件，点击右侧印章，一键加盖。
        </p>
      </div>

      {/* 上传按钮区域 */}
      <div className="flex-1 flex items-start justify-center pt-2">
        <div className="px-20 w-[80%]">
          <DropUploadButton
            text='拖拽文件或 <span class="filepond--label-action">浏览</span>'
            onFileSelect={handleFileSelect} />
        </div>
      </div>

      {/* 设置参数区域 */}
      <div className='flex-1 flex items-start justify-center'>
        <div className={`px-20 grid grid-cols-3 gap-4`}>
          <InputFloatingLabel
            type="number"
            label="宽度  mm"
            value={valueWidth}
            onChange={getValueWidth}
          />
          <InputFloatingLabel
            type="number"
            label="位置偏移  mm"
            value={valueOffset}
            onChange={getValueOffset}
          />

          {/* 选择印章类型区域 */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center">
              <input type="radio" name="sealType" id="sealTypeAll" className="mr-2" defaultChecked onChange={() => setSealType('全部')} />
              <label htmlFor="sealTypeAll" className="text-sm text-gray-500">全部</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="sealType" id="sealTypeRiding" className="mr-2" onChange={() => setSealType('骑缝章')} />
              <label htmlFor="sealTypeRiding" className="text-sm text-gray-500">骑缝章</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="sealType" id="sealTypeStamp" className="mr-2" onChange={() => setSealType('印章')} />
              <label htmlFor="sealTypeStamp" className="text-sm text-gray-500">印章</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center mt-5">
        <div className="px-20 w-[60%]">
          <SubmitButton
            loading={loading}
            disabled={disabled}
            onClick={handleSubmit}
            text='生成'
            color='red' />
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

        <StampManage onImageSelect={handleImageSelect} />
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

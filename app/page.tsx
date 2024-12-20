'use client'

import { useState, useEffect, Suspense } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import TaskAlert from '../components/TaskAlert'
import Link from 'next/link'
import Header from '../components/header/Header'

// 背景动画组件
// 使用 useEffect 在组件挂载时初始化背景动画
// 在组件卸载时清理动画资源
const Background = () => {
  useEffect(() => {
    let colorbg: any = null
    
    // 异步初始化背景动画
    const initBackground = async () => {
      try {
        // 动态导入背景动画模块
        const module = await import('../public/jsm/home_bg.js')
        const AestheticFluidBg = module.AestheticFluidBg
        // 创建背景动画实例，配置颜色和循环选项
        colorbg = new AestheticFluidBg({
          dom: "box",  // 动画容器的 ID
          colors: ["#3e228b","#6C58EE","#2d1969","#6e43e9","#000000","#180c3d"],  // 渐变色配置
          loop: true   // 启用循环动画
        })
      } catch (error) {
        console.error('Failed to load background:', error)
      }
    }

    initBackground()

    // 清理函数：组件卸载时销毁动画实例
    return () => {
      if (colorbg && colorbg.destroy) {
        colorbg.destroy()
      }
    }
  }, [])

  // 返回动画容器元素
  return (
    <div 
      id="box" 
      className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out opacity-0 animate-fadeIn"
    />
  )
}

// 主页组件
export default function Example() {
  // 状态管理
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)  // 控制移动端菜单
  const [isLoading, setIsLoading] = useState(true)            // 控制加载状态
  const [showAlert, setShowAlert] = useState(false)           // 控制提示框显示

  // 初始化加载效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // 处理导航点击事件
  // isComingSoon 为 true 时显示开发中提示
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, isComingSoon?: boolean) => {
    if (isComingSoon) {
      e.preventDefault()
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* 开发中提示框 */}
      <TaskAlert show={showAlert} setShow={setShowAlert} />
      
      {/* 背景动画容器 */}
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <Background />
      </Suspense>
      
      {/* 主要内容容器 */}
      <div className={`absolute inset-0 flex flex-col z-10 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />

        {/* 页面主要内容 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl px-6 lg:px-8">
            <div className="text-center">
              {/* 主标题 */}
              <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
                <span className="inline-block bg-gradient-to-r from-white via-white/100 to-white/20 bg-clip-text text-transparent">
                  标书革命,从AI开始
                </span>
              </h1>
              {/* 副标题 */}
              <p className="mt-8 text-pretty text-lg font-medium text-white sm:text-xl/10">
                魔法标书 - 秒写、智审、精优。从灵感到落地，突破效率极限，一站式打造制胜方案，领先一步赢得未来！
              </p>
              {/* 操作按钮组 */}
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link 
                href="/magic_stamp"
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-md font-medium rounded-md focus:outline-none focus:from-violet-600 focus:to-blue-600 py-3 px-4">
                快速开始
                  <svg className="shrink-0 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
                <a 
                  href="#" 
                  onClick={(e) => handleNavClick(e, true)} 
                  className="text-md font-semibold text-white hover:text-gray-100"
                >
                  了解更多 <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

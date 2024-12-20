'use client'

import { useState, useEffect, Suspense } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import TaskAlert from '../components/TaskAlert'
import Link from 'next/link'

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

// 导航配置
// isComingSoon: true 表示该功能正在开发中
const navigation = [
  { name: '首页', href: '/' },
  { name: '标书工程师', href: '#', isComingSoon: true },
  { name: '工具', href: '#', isComingSoon: true },
  { name: '价格', href: '#', isComingSoon: true },
  { name: '关于我们', href: '#', isComingSoon: true },
]

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
        {/* 页面头部 */}
        <header className="flex-none z-50">
          <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
            {/* Logo 区域 */}
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Bid Writer</span>
                <img
                  alt=""
                  src="/img/logo/logo-all-white.png"
                  className="h-6 w-auto"
                />
              </a>
            </div>

            {/* 移动端菜单按钮 */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* 桌面端导航菜单 */}
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.isComingSoon)}
                  className="text-lg font-semibold text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* 预留的右侧空间 */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {/* 登录按钮（暂时注释掉） */}
            </div>
          </nav>

          {/* 移动端菜单对话框 */}
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              {/* 移动端菜单头部 */}
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Bid Writer</span>
                  <img
                    alt=""
                    src="/img/logo/logo-only-white.png"
                    className="h-8 w-auto"
                  />
                </a>
                {/* 关闭按钮 */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* 移动端菜单内容 */}
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.isComingSoon)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  {/* 移��端菜单底部（预留） */}
                  <div className="py-6">
                    {/* 登录按钮（暂时注释掉） */}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

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
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  快速开始
                </Link>
                <a 
                  href="#" 
                  onClick={(e) => handleNavClick(e, true)} 
                  className="text-sm/6 font-semibold text-white"
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

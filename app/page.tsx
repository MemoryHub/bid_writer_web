'use client'

import { useState, useEffect, Suspense } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import TaskAlert from '../components/TaskAlert'

// 创建一个单独的背景组件
const Background = () => {
  useEffect(() => {
    let colorbg: any = null
    
    const initBackground = async () => {
      try {
        const module = await import('../public/jsm/home_bg.js')
        const AestheticFluidBg = module.AestheticFluidBg
        colorbg = new AestheticFluidBg({
          dom: "box",
          colors: ["#3e228b","#6C58EE","#2d1969","#6e43e9","#000000","#180c3d"],
          loop: true
        })
      } catch (error) {
        console.error('Failed to load background:', error)
      }
    }

    initBackground()

    // 清理函数
    return () => {
      if (colorbg && colorbg.destroy) {
        colorbg.destroy()
      }
    }
  }, [])

  return (
    <div 
      id="box" 
      className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out opacity-0 animate-fadeIn"
    />
  )
}

const navigation = [
  { name: '首页', href: '/' },
  { name: '标书工程师', href: '#', isComingSoon: true },
  { name: '工具', href: '#', isComingSoon: true },
  { name: '价格', href: '#', isComingSoon: true },
  { name: '关于我们', href: '#', isComingSoon: true },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // 修改导航点击处理
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, isComingSoon?: boolean) => {
    if (isComingSoon) {
      e.preventDefault()
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <TaskAlert show={showAlert} setShow={setShowAlert} />
      
      {/* 背景容器 */}
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <Background />
      </Suspense>
      
      {/* 主要内容 - 修改为固定全屏布局 */}
      <div className={`absolute inset-0 flex flex-col z-10 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <header className="flex-none z-50">
          <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
            </div>
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
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.isComingSoon)}
                  className="text-sm/6 font-semibold text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {/* <a href="#" className="text-sm/6 font-semibold text-white">
                Log in <span aria-hidden="true">&rarr;</span>
              </a> */}
            </div>
          </nav>
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Bid Writer</span>
                  <img
                    alt=""
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
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
                  <div className="py-6">
                    {/* <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a> */}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        {/* 中间内容区域 - 使用 flex 布局居中 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
                <span className="inline-block bg-gradient-to-r from-white via-white/100 to-white/20 bg-clip-text text-transparent">
                  标书革命,从AI开始
                </span>
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-white sm:text-xl/10">
                魔法标书 - 秒写、智审、精优。从灵感到落地，突破效率极限，一站式打造制胜方案，领先一步赢得未来！
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  快速开始
                </a>
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

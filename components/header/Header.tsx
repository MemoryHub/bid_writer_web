'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import TaskAlert from '../TaskAlert'

const navigation = [
  { name: '首页', href: '/' },
  { name: '标书工程师', href: '#', isComingSoon: true },
  { name: '魔法工具', href: '/tools/tools_list'},
  { name: '价格', href: '#', isComingSoon: true },
  { name: '关于我们', href: '#', isComingSoon: true },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, isComingSoon?: boolean) => {
    if (isComingSoon) {
      e.preventDefault()
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  return (
    <>
      <TaskAlert show={showAlert} setShow={setShowAlert} />
      <header className="flex-none z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          {/* Logo 区域 */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Bid Writer</span>
              <img
                alt=""
                src="/img/logo/logo-all-white.png"
                className="h-6 w-auto"
              />
            </Link>
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
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.isComingSoon)}
                className="text-lg font-semibold text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* 预留的右侧空间 */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          </div>
        </nav>

        {/* 移动端菜单对话框 */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            {/* 移动端菜单头部 */}
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Bid Writer</span>
                <img
                  alt=""
                  src="/img/logo/logo-only-white.png"
                  className="h-8 w-auto"
                />
              </Link>
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
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.isComingSoon)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import TaskAlert from '../TaskAlert'
import { logout } from '@/services/userServices'
import Alert from '../alert/Alert'

const navigation = [
  { name: '首页', href: '/' },
  { name: '标书工程师', href: '#', isComingSoon: true },
  { name: '魔法工具', href: '/tools/tools_list' },
  { name: '价格', href: '/pricing/pricing' },
  { name: '资讯', href: '#', isComingSoon: true },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showTaskAlert, setShowTaskAlert] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMsg, setAlertMsg] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedEmail = localStorage.getItem('email')
    if (token) {
      setIsLoggedIn(true)
      setEmail(storedEmail || '')
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      setIsLoggedIn(false)
      setEmail('')
      setAlertType('success')
      setAlertTitle('登出成功')
      setAlertMsg('你已成功登出')
      setShowAlert(true)
      window.location.href = '/'
    } catch (error) {
      console.error('登出失败:', error)
      setAlertType('error')
      setAlertTitle('错误')
      setAlertMsg('登出失败，请重试')
      setShowAlert(true)
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, isComingSoon?: boolean) => {
    if (isComingSoon) {
      e.preventDefault()
      setShowTaskAlert(true)
      setTimeout(() => setShowTaskAlert(false), 3000)
    }
  }

  return (
    <>
      {showAlert && (
        <Alert
          type={alertType}
          title={alertTitle}
          msg={alertMsg}
          onClose={() => setShowAlert(false)}
        />
      )}

      {showTaskAlert && (
        <TaskAlert title="魔法即将降临..." msg="即将开启探索之旅,敬请期待！" show={showTaskAlert} setShow={setShowTaskAlert} />
      )}

      <header className="flex-none z-40">
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
            <div className="">
              {isLoggedIn ? (
                <div className="flex items-center">
                  <span className="text-white mr-4">{email}</span>
                  <button onClick={handleLogout} className="text-white hover:text-gray-300">
                    登出
                  </button>
                </div>
              ) : (
                <div className="">
                  <Link
                    key={"Login in"}
                    href={"/login/login"}
                    onClick={(e) => ("")}
                    className="text-base font-medium text-white mr-6"
                  >
                    登录
                  </Link>

                  <Link
                    href="/sign_up/sign_up"
                    className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-red-600 to-violet-600 hover:from-violet-600 hover:to-red-600 text-white text-md font-medium rounded-[100px] focus:outline-none focus:from-violet-600 focus:to-blue-600 py-1 px-4">
                    免费注册
                  </Link>
                </div>
              )}
            </div>
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
                <div className="py-6">
                  {isLoggedIn ? (
                    <div className="flex items-center">
                      <span className="mr-4 text-gray-900 hover:bg-gray-50">{email}</span>
                      <button onClick={handleLogout} className="text-indigo-400 hover:text-gray-300">
                        登出
                      </button>
                    </div>
                  ) : (
                    <div className="">
                      <Link
                        key="Login in"
                        href="/login/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 mb-10 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        登录
                      </Link>
                      <Link
                        href="/sign_up/sign_up"
                        className="w-[95%] inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-red-600 to-violet-600 hover:from-violet-600 hover:to-red-600 text-white text-md font-medium rounded-[100px] focus:outline-none focus:from-violet-600 focus:to-blue-600 py-1 px-4"
                      >
                        免费注册
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  )
} 
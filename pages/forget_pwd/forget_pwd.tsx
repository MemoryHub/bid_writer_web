'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import '../../app/globals.css'
import GradientBg from '../../components/bg/GradientBg'

export default function ForgetPwd() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push({
      pathname: '/sign_up/verify',
      query: { email }
    })
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <GradientBg />
        <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
          <picture>
            <source
              srcSet="/img/logo/logo-only-white.png"
              media="(prefers-color-scheme: dark)"
            />
            <img
              className="mx-auto h-12 w-auto"
              src="/img/logo/logo-only-color.png"
              alt="Bid Writer"
            />
          </picture>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
            重新设置你的密码
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              我要{' '}
            <Link href="/login/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              立即登录
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="px-4 sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  邮箱地址
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-[100px] bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 py-3 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  找回密码
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
} 
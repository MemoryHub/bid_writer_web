'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import '../../app/globals.css'
import GradientBg from '../../components/bg/GradientBg'

export default function Verify() {
  const router = useRouter()
  const { email } = router.query
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)

      // 自动跳转到下一个输入框
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = verificationCode.join('')
    // 这里添加验证码验证逻辑
    console.log('Verification code:', code)
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
            邮箱验证
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            我们已发送验证邮件至
            <span className="font-medium text-indigo-600 dark:text-indigo-400"> {email} </span>
          </p>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            请点击邮件中的"验证邮箱"按钮继续
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="px-4 sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  验证码
                </label>
                <div className="mt-1 flex justify-center space-x-2">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-[100px] bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 py-3 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  确认
                </button>
              </div>
            </form>

            <div className="mt-6">
              <button
                type="button"
                className="flex w-full justify-center text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                没有收到邮件？重新发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 
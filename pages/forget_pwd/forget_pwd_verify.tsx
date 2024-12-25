'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import '../../app/globals.css'
import GradientBg from '../../components/bg/GradientBg'
import Alert from '@/components/alert/Alert'
import SubmitButton from '@/components/button/SubmitButton'
import { registrationByCode, resetPwd, sendForgetPwdCode, sendRegistrationCode } from '@/services/userServices'

export default function ForgetPwdVerify() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [countdown, setCountdown] = useState(60)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMsg, setAlertMsg] = useState('')

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


  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return timer
  }

  useEffect(() => {
    // Check for existing countdown in localStorage
    if (typeof window !== 'undefined') {
      const savedCountdown = localStorage.getItem('countdown')
      if (savedCountdown) {
        setCountdown(Number(savedCountdown))
      }
      const savedEmail = localStorage.getItem('forgot_pwd_email')
      if (savedEmail) {
        setEmail(savedEmail)
      }
    }

    const timer = startCountdown()

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Save countdown to localStorage
    localStorage.setItem('countdown', countdown.toString())
  }, [countdown])



  const handleResendCode = async () => {
    setCountdown(60) // Reset countdown
    startCountdown()
    try {
      const response = await sendForgetPwdCode(localStorage.getItem('forgot_pwd_email') as string);
      if (response.code === 200) {
        setAlertType('success');
        setAlertTitle('验证码已发送');
        setAlertMsg('请检查您的邮箱以获取验证码');
        setShowAlert(true);
      } else {
        setAlertType('error');
        setAlertTitle('发送验证码失败');
        setAlertMsg('请检查您的邮箱以获取验证码');
        setShowAlert(true);
        setCountdown(0);
      }
    } catch (error) {
      setAlertType('error');
      setAlertTitle('发送验证码失败');
      setAlertMsg('请检查您的邮箱以获取验证码');
      setShowAlert(true);
      setCountdown(0);
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const code = verificationCode.join('');
    // Validate email and code
    if (!email || !code) {
      setAlertType('error');
      setAlertTitle('错误');
      setAlertMsg('请确保输入有效的邮箱和验证码');
      setShowAlert(true);
      setLoading(false);
      return;
    }

    try {
      const response = await resetPwd(email as string, code, password);
      if (response.code === 200) {
        setAlertType('success');
        setAlertTitle('成功');
        setAlertMsg('找回密码成功，请登录');
        setShowAlert(true);
        localStorage.removeItem('forgot_pwd_email');

        router.push('/');
      } else {
        setAlertType('error');
        setAlertTitle('失败');
        setAlertMsg('找回密码失败，请重试');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertType('error');
      setAlertTitle('失败');
      setAlertMsg('找回密码失败，请重试');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

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
            <form className="space-y-6">
              <div>
                <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100 text-center mb-4">
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
                <div className="flex items-center justify-center">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100 mb-4">
                    新密码
                  </label>
                </div>
                <div className="mt-2 flex justify-center">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="请输入你的新密码"
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>


              <div>
                <SubmitButton
                  loading={loading}
                  onClick={handleRegister}
                  text="确认"
                />
              </div>
            </form>

            <div className="mt-6">
              <button
                type="button"
                className={`flex w-full justify-center text-sm ${countdown > 0 ? 'text-gray-700 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-500'} dark:text-indigo-400 dark:hover:text-indigo-300`}
                onClick={handleResendCode}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `验证码已发送 (${countdown}秒)` : '没有收到邮件？重新发送'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 
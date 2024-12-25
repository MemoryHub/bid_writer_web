'use client'

import '../../app/globals.css'  // 导入全局样式
import GradientBg from '../../components/bg/GradientBg'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { sendRegistrationCode } from '../../services/userServices';
import Alert from '@/components/alert/Alert';
import Link from 'next/link';
import SubmitButton from '../../components/button/SubmitButton';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await sendRegistrationCode(email);
      if (response.code === 200) {
        localStorage.setItem('pwd', password); 
        setAlertType('success');
        setAlertTitle('验证码已发送');
        setAlertMsg('请检查您的邮箱以获取验证码');
        setShowAlert(true);

        setTimeout(() => {
          router.push('/sign_up/verify');
        }, 1000);
      } else {
        setErrorMessage('发送验证码失败，请检查您的邮箱');
      }
    } catch (error) {
      setErrorMessage('发送验证码失败，请检查您的邮箱');
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
            创建你的账号，快速加入我们
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            已有账户？{' '}
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
                    placeholder="请输入邮箱地址"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  密码
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
              {errorMessage && <p className="text-xs ml-2 mb-6 text-red-500">{errorMessage}</p>}
             
              <SubmitButton
                loading={loading}
                onClick={handleSubmit}
                text="发送验证码"
              />
           
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 
'use client' // 确保这是一个客户端组件

import '../../app/globals.css'  // 导入全局样式
import GradientBg from '../../components/bg/GradientBg'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { login } from '../../services/userServices'; // 更新导入路径
import { LoginResponse } from '../../utils/response'; // 导入 LoginResponse 接口
import Alert from '@/components/alert/Alert'; // 导入 Alert 组件
import SubmitButton from '../../components/button/SubmitButton';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [loading, setLoading] = useState(false); // 添加 loading 状态

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 开始加载
    setErrorMessage('');
    try {
      const response = await login(email, password) as LoginResponse; // 使用 LoginResponse 类型
      if (response && response.access_token) {
        localStorage.setItem('token', response.access_token); // 后端返回 token
        localStorage.setItem('email', email); 
        setAlertType('success');
        setAlertTitle('登录成功');
        setAlertMsg('你已成功登录，即将返回主页...');
        setShowAlert(true);
          // 显示 Alert 后延迟执行 router.back()
          setTimeout(() => {
            router.push('/');
          }, 1000); // 1秒后执行

      } else {
        setErrorMessage('登录失败，请检查您的邮箱和密码');
      }
    } catch (error) {
      setErrorMessage('登录失败，请检查您的邮箱和密码');
    } finally {
      setLoading(false); // 结束加载
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
        <button
          className="mt-10 ml-20 font-semibold absolute top-4 left-4 flex items-center text-indigo-600 hover:text-indigo-500"
          onClick={() => router.back()}
        >
          <span className="mr-2 ">←</span> 返回
        </button>
        <GradientBg />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <picture>
            <source
              srcSet="/img/logo/logo-only-white.png"
              media="(prefers-color-scheme: dark)"
            />
            <img
              alt="Bid Writer"
              src="/img/logo/logo-only-color.png"
              className="mx-auto h-10 w-auto"
            />
          </picture>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
            登录你的账号
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                邮箱地址
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="请输入你的邮箱地址"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  密码
                </label>
                <div className="text-sm">
                  <a href="/forget_pwd/forget_pwd" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                    忘记密码?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="请输入你的密码"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {errorMessage && <p className="text-xs ml-2 text-red-500">{errorMessage}</p>}

            <div>
              <SubmitButton
                loading={loading}
                onClick={handleSubmit}
                text="登录"
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
              还没有账号?{' '}
            <a href="/sign_up/sign_up" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              立即注册
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

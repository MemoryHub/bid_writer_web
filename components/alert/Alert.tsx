'use client'

import { useEffect } from 'react';

interface AlertProps {
  type: 'success' | 'error';
  title: string;
  msg: string;
  onClose: () => void; // 用于关闭 Alert 的回调函数
}

const Alert: React.FC<AlertProps> = ({ type, title, msg, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // 3秒后自动关闭
    }, 3000);

    return () => clearTimeout(timer); // 清除定时器
  }, [onClose]);

  const alertStyles = {
    success: {
      container: 'bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 min-w-[100px]',
      icon: 'border-4 border-teal-100 bg-teal-200 text-teal-800',
      title: 'text-gray-800 font-semibold',
      message: 'text-sm text-gray-700',
    },
    error: {
      container: 'bg-red-50 border-l-4 border-red-500 p-4 min-w-[100px]',
      icon: 'border-4 border-red-100 bg-red-200 text-red-800',
      title: 'text-gray-800 font-semibold',
      message: 'text-sm text-gray-700',
    },
  };

  const currentStyles = alertStyles[type];

  return (
    <div className={`w-[300px] fixed top-4 left-1/2 transform -translate-x-1/2 ${currentStyles.container} z-50`} role="alert">
      <div className="flex">
        <div className="shrink-0">
          {/* Icon */}
          <span className={`inline-flex justify-center items-center size-8 rounded-full ${currentStyles.icon}`}>
            {type === 'success' ? (
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            ) : (
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            )}
          </span>
          {/* End Icon */}
        </div>
        <div className="ms-3">
          <h3 className={currentStyles.title}>{title}</h3>
          <p className={currentStyles.message}>{msg}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;

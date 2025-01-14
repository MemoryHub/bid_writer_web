'use client'

import React from 'react';

interface SubmitButtonProps {
  loading: boolean;
  onClick: (e: React.FormEvent) => Promise<void>; 
  text: string;
  color?: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, onClick, text, color = 'blue', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`flex w-full justify-center rounded-[100px] ${disabled ? 'bg-gray-400 cursor-not-allowed' : `bg-gradient-to-tl from-${color}-600 to-violet-600 hover:from-violet-600 hover:to-${color}-600`} py-3 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading || disabled} // 禁用按钮
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
          <span className="ml-2 text-sm">加载中...</span>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean; // 控制Modal是否显示
  onSubmit: () => void;
  submitText: string;         // 按钮名称
  title: string;              // Modal标题
  content: string;            // Modal内容
}

export default function Modal({ isOpen, onSubmit, submitText, title, content }: ModalProps) {
  return (
    <div>
      {isOpen && (
        <div
          id="hs-basic-modal"
          className="hs-overlay fixed inset-0 z-80 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500"
          role="dialog"
          tabIndex={-1}
          aria-labelledby="hs-basic-modal-label"
        >
          <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                <h3 id="hs-basic-modal-label" className="font-bold text-gray-800 dark:text-white">
                  {title} {/* 使用传递的标题 */}
                </h3>
                <button
                  type="button"
                  className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                  aria-label="Close"
                >
                  <span className="sr-only">取消</span>
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <p className="mt-1 text-gray-800 dark:text-neutral-400">
                  {content} {/* 使用传递的内容 */}
                </p>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  取消
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => {
                    onSubmit(); // 关闭Modal
                    // Add your custom submit logic here
                  }}
                >
                  {submitText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

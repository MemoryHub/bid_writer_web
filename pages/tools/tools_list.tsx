'use client'

import Header from '../../components/header/Header'
import '../../app/globals.css'
import Link from 'next/link'
import { useState } from 'react'
import TaskAlert from '../../components/TaskAlert'

const tools = [
  {
    title: "魔法印章",
    description: "一键盖章，支持一键加盖整本印章，一键加盖骑缝章。",
    href: "/magic_stamp",
    isComingSoon: false
  },
  {
    title: "电子签名",
    description: "智能插入电子签名，支持图片插入，让标书更专业。",
    href: "#",
    isComingSoon: true
  },
  {
    title: "魔法排版",
    description: "智能识别文档结构，自动调整格式，让标书排版更专业。",
    href: "#",
    isComingSoon: true
  }
];

export default function ToolsList() {
  const [showAlert, setShowAlert] = useState(false)

  const handleToolClick = (e: React.MouseEvent<HTMLAnchorElement>, isComingSoon: boolean) => {
    if (isComingSoon) {
      e.preventDefault()
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <TaskAlert show={showAlert} setShow={setShowAlert} />
      <Header />
      {/* 内容区域 */}
      <div className="flex-1 bg-gray-50 py-10">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            魔法工具箱
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            专为标书定制，带有魔法的工具。你能在这里找到你最想要的制作标书所需工具。
          </p>
          {/* Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.title}>
                <Link 
                  href={tool.href}
                  onClick={(e) => handleToolClick(e, tool.isComingSoon)}
                  className="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
                    <img
                      className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
                      src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                      alt={tool.title}
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-xl font-bold text-gray-800">
                      {tool.title}
                    </h3>
                    <p className="text-sm mt-2 text-gray-600">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

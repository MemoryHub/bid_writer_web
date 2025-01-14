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
    img: "/img//magic-stamp.jpg",
    isComingSoon: false
  },
  {
    title: "电子签名",
    description: "智能插入电子签名，支持图片插入，让标书更专业。",
    href: "#",
    img: "/img//magic-sign.jpg",
    isComingSoon: true
  },
  {
    title: "魔法排版",
    description: "智能识别文档结构，自动调整格式，让标书排版更专业。",
    href: "#",
    img: "/img//magic-form.jpg",
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
    <div className="min-h-screen flex flex-col font-sans bg-[#212121]">
      <TaskAlert title="魔法即将降临..." msg="即将开启探索之旅,敬请期待！" show={showAlert} setShow={setShowAlert} />
      <Header />
      {/* 内容区域 */}
      <div className="flex-1 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl mb-4 text-white">
            魔法工具箱
          </h1>
          <p className="text-white text-md mb-8">
            专为标书定制，带有魔法的工具。你能在这里找到你最想要的制作标书所需工具。
          </p>
          {/* Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.title}>
                <Link 
                  href={tool.href}
                  onClick={(e) => handleToolClick(e, tool.isComingSoon)}
                  className="flex flex-col group shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition bg-[#2F2F2F]"
                >
                  <div className="relative pt-[50%] sm:pt-[30%] lg:pt-[40%] rounded-t-xl overflow-hidden">
                    <img
                      className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
                      src={tool.img}
                      alt={tool.title}
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-md font-bold text-white">
                      {tool.title}
                    </h3>
                    <p className="text-xs mt-2 text-white text-opacity-80">
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

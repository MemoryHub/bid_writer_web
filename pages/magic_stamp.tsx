'use client'

import Header from '../components/header/Header'
import '../app/globals.css'

export default function MagicStamp() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <Header />
      {/* 其他内容 */}
    </div>
  )
}

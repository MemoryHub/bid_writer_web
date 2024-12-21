'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PreloadRoutes() {
  const pathname = usePathname()

  useEffect(() => {
    const routesToPreload = [
      '/magic_stamp',
      '/tools/tools_list',
      '/pricing/pricing',
      '/login/login',
      // 添加其他需要预加载的路由
    ]

    routesToPreload.forEach(route => {
      if (route !== pathname) {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = route
        document.head.appendChild(link)
      }
    })
  }, [pathname])

  return null
} 
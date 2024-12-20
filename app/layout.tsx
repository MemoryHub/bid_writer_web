import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Suspense } from 'react';
import PreloadRoutes from '../components/routes/PreloadRoutes';

// 配置思源黑体
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bid Writer",
  description: "AI驱动的标书革命",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSansSC.variable} font-sans`}>
        <Suspense fallback={null}>
          <PreloadRoutes />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

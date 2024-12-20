/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],  // 如果你的外部JS依赖three.js
  webpack: (config) => {
    config.externals = {
      ...config.externals,
      canvas: 'canvas',  // 如果你的外部JS需要canvas
    }
    // 添加性能优化
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: true,
    }

    // 添加 Node.js polyfills
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      assert: require.resolve('assert'),
      os: require.resolve('os-browserify'),
      path: require.resolve('path-browserify'),
      'crypto-browserify': require.resolve('crypto-browserify'),
    }

    return config
  },

  // 添加页面优化配置
  experimental: {
    optimizeCss: true,    // 优化 CSS
    optimizeImages: true, // 优化图片
    scrollRestoration: true, // 优化滚动恢复
  },

  // 添加性能优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig 
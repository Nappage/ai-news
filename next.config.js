/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // GitHub Pages用の設定
  basePath: process.env.NODE_ENV === 'production' ? '/ai-news' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ai-news/' : '',
  
  // 静的生成の設定

  // Webpack設定
  webpack: (config, { isServer }) => {
    // カスタムwebpack設定があれば追加
    return config
  },

  // 環境変数の設定
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
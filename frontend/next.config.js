/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'antd',
    '@ant-design/cssinjs',
    'rc-util',
    'rc-pagination',
    'rc-picker'
  ],
  images: {
    domains: ['static.aitools.fyi']
  },
  webpack: (config) => {
    // 处理 ES 模块
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false
      }
    });

    return config;
  }
}

module.exports = nextConfig 
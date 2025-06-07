import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  )
} 
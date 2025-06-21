import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI News - 生成AI・LLM最新ニュース',
  description: '生成AIとLLM業界の最新動向を毎日お届け。OpenAI、Anthropic、Google、Metaなど主要企業のニュースを網羅。',
  keywords: ['AI', 'LLM', 'ChatGPT', 'Claude', 'Gemini', '生成AI', 'OpenAI', 'Anthropic'],
  authors: [{ name: 'AI News Team' }],
  creator: 'AI News',
  publisher: 'AI News',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
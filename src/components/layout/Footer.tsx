import Link from 'next/link'
import { Github, Twitter, Rss } from 'lucide-react'

const footerNavigation = {
  main: [
    { name: 'ホーム', href: '/' },
    { name: 'カテゴリ', href: '/category' },
    { name: '企業', href: '/company' },
    { name: 'アーカイブ', href: '/archives' },
    { name: 'サイトについて', href: '/about' },
  ],
  categories: [
    { name: 'LLM・モデル', href: '/category/llm' },
    { name: '企業動向', href: '/category/companies' },
    { name: '研究・論文', href: '/category/research' },
    { name: 'ツール・アプリ', href: '/category/tools' },
    { name: '業界・政策', href: '/category/industry' },
  ],
  companies: [
    { name: 'OpenAI', href: '/company/openai' },
    { name: 'Anthropic', href: '/company/anthropic' },
    { name: 'Google', href: '/company/google' },
    { name: 'Meta', href: '/company/meta' },
    { name: 'その他企業', href: '/company/others' },
  ],
  social: [
    {
      name: 'GitHub',
      href: '#',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'RSS',
      href: '/rss.xml',
      icon: Rss,
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-foreground">AI News</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              生成AIとLLM業界の最新動向を毎日お届け。主要企業のニュースから研究論文まで幅広くカバー。
            </p>
            <div className="flex space-x-4">
              {footerNavigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Main navigation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">サイト</h3>
            <ul className="space-y-3">
              {footerNavigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">カテゴリ</h3>
            <ul className="space-y-3">
              {footerNavigation.categories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Companies */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">企業</h3>
            <ul className="space-y-3">
              {footerNavigation.companies.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI News. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                利用規約
              </Link>
              <Link
                href="/sitemap"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                サイトマップ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
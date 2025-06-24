import { Map, Home, Search, Archive, Building2, Tag, FileText, Users, Info } from 'lucide-react'
import Link from 'next/link'

const siteStructure = {
  main: [
    {
      title: 'ホーム',
      url: '/',
      description: 'AI業界の最新ニュース一覧',
      icon: Home,
    },
    {
      title: '検索',
      url: '/search',
      description: 'キーワード・フィルター検索',
      icon: Search,
    },
    {
      title: 'アーカイブ',
      url: '/archives',
      description: '月別ニュースアーカイブ',
      icon: Archive,
    },
  ],
  categories: [
    {
      title: 'カテゴリ一覧',
      url: '/category',
      description: '全カテゴリの概要',
      children: [
        { title: 'LLM・モデル', url: '/category/llm', description: '大規模言語モデル関連' },
        { title: '企業動向', url: '/category/companies', description: 'AI企業の最新動向' },
        { title: '研究・論文', url: '/category/research', description: '学術研究・論文' },
        { title: 'ツール・アプリ', url: '/category/tools', description: 'AIツール・アプリケーション' },
        { title: '業界・政策', url: '/category/industry', description: '業界動向・政策・規制' },
        { title: '資金調達', url: '/category/funding', description: '投資・買収・資金調達' },
      ],
    },
  ],
  companies: [
    {
      title: '企業一覧',
      url: '/company',
      description: '主要AI企業の概要',
      children: [
        { title: 'OpenAI', url: '/company/openai', description: 'ChatGPT、GPT-4などを開発' },
        { title: 'Anthropic', url: '/company/anthropic', description: 'Claude、AI安全性研究' },
        { title: 'Google', url: '/company/google', description: 'Bard、PaLM、Gemini開発' },
        { title: 'Meta', url: '/company/meta', description: 'LLaMA、オープンソースAI' },
        { title: 'Hugging Face', url: '/company/hugging-face', description: 'AIモデルプラットフォーム' },
        { title: 'その他企業', url: '/company/others', description: 'DeepSeek、Manus等' },
      ],
    },
  ],
  info: [
    {
      title: 'サイト情報',
      url: '/about',
      description: 'AI Newsについて',
      icon: Info,
    },
    {
      title: 'プライバシーポリシー',
      url: '/privacy',
      description: '個人情報保護方針',
      icon: FileText,
    },
    {
      title: '利用規約',
      url: '/terms',
      description: 'サービス利用規約',
      icon: Users,
    },
  ],
}

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダー */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Map className="h-12 w-12 text-primary mr-4" />
          <h1 className="text-4xl font-bold text-foreground">サイトマップ</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI Newsの全ページ構成をご確認いただけます
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* メインページ */}
        <section>
          <div className="flex items-center mb-6">
            <Home className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">メインページ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteStructure.main.map((page) => {
              const Icon = page.icon
              return (
                <Link
                  key={page.url}
                  href={page.url}
                  className="group bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                        {page.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {page.description}
                      </p>
                      <div className="mt-3 text-xs text-muted-foreground font-mono">
                        {page.url}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* カテゴリページ */}
        <section>
          <div className="flex items-center mb-6">
            <Tag className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">カテゴリページ</h2>
          </div>
          <div className="space-y-6">
            {siteStructure.categories.map((section) => (
              <div key={section.url} className="bg-card rounded-lg border border-border p-6">
                <Link 
                  href={section.url}
                  className="inline-block mb-4 group"
                >
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{section.description}</p>
                  <div className="text-xs text-muted-foreground font-mono">{section.url}</div>
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {section.children?.map((child) => (
                    <Link
                      key={child.url}
                      href={child.url}
                      className="block bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors group"
                    >
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                        {child.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">{child.description}</p>
                      <div className="text-xs text-muted-foreground font-mono">{child.url}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 企業ページ */}
        <section>
          <div className="flex items-center mb-6">
            <Building2 className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">企業ページ</h2>
          </div>
          <div className="space-y-6">
            {siteStructure.companies.map((section) => (
              <div key={section.url} className="bg-card rounded-lg border border-border p-6">
                <Link 
                  href={section.url}
                  className="inline-block mb-4 group"
                >
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{section.description}</p>
                  <div className="text-xs text-muted-foreground font-mono">{section.url}</div>
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {section.children?.map((child) => (
                    <Link
                      key={child.url}
                      href={child.url}
                      className="block bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors group"
                    >
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                        {child.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">{child.description}</p>
                      <div className="text-xs text-muted-foreground font-mono">{child.url}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 個別記事ページ */}
        <section>
          <div className="flex items-center mb-6">
            <FileText className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">個別記事ページ</h2>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              ニュース記事詳細ページ
            </h3>
            <p className="text-muted-foreground mb-4">
              各ニュース記事の詳細ページ。記事内容、関連記事、元記事へのリンクなどを表示します。
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">URL形式:</p>
              <code className="text-xs font-mono text-foreground bg-background px-2 py-1 rounded">
                /news/[記事ID]
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                例: /news/mcaif11kr553qsmvtfm
              </p>
            </div>
          </div>
        </section>

        {/* サイト情報ページ */}
        <section>
          <div className="flex items-center mb-6">
            <Info className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">サイト情報ページ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteStructure.info.map((page) => {
              const Icon = page.icon
              return (
                <Link
                  key={page.url}
                  href={page.url}
                  className="group bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-muted/50 rounded-lg p-3 flex-shrink-0">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                        {page.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {page.description}
                      </p>
                      <div className="mt-3 text-xs text-muted-foreground font-mono">
                        {page.url}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* 統計情報 */}
        <section>
          <div className="bg-muted/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">サイト統計</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">30+</div>
                <div className="text-sm text-muted-foreground">総ページ数</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">カテゴリ数</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">対象企業数</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">自動更新</div>
              </div>
            </div>
          </div>
        </section>

        {/* フッター情報 */}
        <section className="text-center">
          <div className="bg-card rounded-xl border border-border p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">その他のリンク</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/Nappage/ai-news"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                GitHub リポジトリ
              </a>
              <Link
                href="/about"
                className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
              >
                サイトについて
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'サイトマップ - AI News',
  description: 'AI Newsの全ページ構成とサイト構造をご確認いただけます。カテゴリ、企業、機能別ページの一覧。',
  openGraph: {
    title: 'サイトマップ - AI News',
    description: 'AI Newsの完全なサイト構造とページ一覧',
    type: 'website',
  },
}
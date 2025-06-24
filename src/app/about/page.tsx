import { Bot, Globe, Zap, Users, Heart, Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダー */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Bot className="h-12 w-12 text-primary mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">AI News について</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          AIの最新動向を自動収集・整理し、日本語で分かりやすく提供する情報プラットフォームです
        </p>
      </div>

      {/* ミッション */}
      <section className="mb-16">
        <div className="bg-card rounded-xl border border-border p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">私たちのミッション</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                急速に発展するAI業界において、重要な情報が英語圏中心に発信される中、
                日本のAI開発者・研究者・ビジネスパーソンが最新動向を効率的にキャッチアップできる環境を提供します。
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                自動化されたニュース収集システムにより、24時間365日最新情報をお届けし、
                AI技術の民主化と知識の平等なアクセスを実現します。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">自動更新</div>
              </div>
              <div className="text-center p-4">
                <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">6社+</div>
                <div className="text-sm text-muted-foreground">主要AI企業</div>
              </div>
              <div className="text-center p-4">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">6つ</div>
                <div className="text-sm text-muted-foreground">専門カテゴリ</div>
              </div>
              <div className="text-center p-4">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">無料</div>
                <div className="text-sm text-muted-foreground">オープンアクセス</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">主な特徴</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="bg-blue-500/10 rounded-lg p-3 w-fit mb-4">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">自動ニュース収集</h3>
            <p className="text-muted-foreground">
              OpenAI、Anthropic、Google、Meta、Hugging Face等の主要AI企業のRSSフィードを自動監視し、
              1日4回最新ニュースを収集・更新します。
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="bg-green-500/10 rounded-lg p-3 w-fit mb-4">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">カテゴリ別整理</h3>
            <p className="text-muted-foreground">
              LLM・モデル、企業動向、研究・論文、ツール・アプリ、業界・政策、資金調達の
              6つのカテゴリでニュースを分類し、興味のある分野を効率的に閲覧できます。
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="bg-purple-500/10 rounded-lg p-3 w-fit mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">高速検索</h3>
            <p className="text-muted-foreground">
              キーワード、企業名、カテゴリ、日付でのフィルタリング機能により、
              必要な情報を瞬時に見つけることができます。
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="bg-orange-500/10 rounded-lg p-3 w-fit mb-4">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">企業別アーカイブ</h3>
            <p className="text-muted-foreground">
              各AI企業の動向を個別に追跡でき、特定の企業の戦略や技術発展を
              時系列で把握することができます。
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="bg-red-500/10 rounded-lg p-3 w-fit mb-4">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">オープンソース</h3>
            <p className="text-muted-foreground">
              完全無料でご利用いただけます。また、技術的な改善提案やフィードバックを
              コミュニティと共有し、サービスを発展させています。
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="bg-yellow-500/10 rounded-lg p-3 w-fit mb-4">
              <Github className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">透明性</h3>
            <p className="text-muted-foreground">
              ソースコードは全てGitHubで公開しており、データ収集方法やアルゴリズムの
              透明性を保ち、信頼性の高い情報提供を心がけています。
            </p>
          </div>
        </div>
      </section>

      {/* 技術スタック */}
      <section className="mb-16">
        <div className="bg-muted/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">技術スタック</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-semibold text-foreground mb-2">フロントエンド</div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Next.js 14</div>
                <div>TypeScript</div>
                <div>Tailwind CSS</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-foreground mb-2">バックエンド</div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Node.js</div>
                <div>RSS Parser</div>
                <div>JSON Storage</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-foreground mb-2">インフラ</div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>GitHub Pages</div>
                <div>GitHub Actions</div>
                <div>Cron Schedule</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-foreground mb-2">開発ツール</div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>ESLint</div>
                <div>Prettier</div>
                <div>Claude Code</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせ・フィードバック */}
      <section className="text-center">
        <div className="bg-card rounded-xl border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">フィードバック・お問い合わせ</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            サービスの改善提案、バグ報告、新機能のリクエストなど、
            ご意見・ご感想をお聞かせください。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/Nappage/ai-news/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub Issues</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/search"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Zap className="h-4 w-4" />
              <span>ニュースを検索する</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export const metadata = {
  title: 'AI Newsについて - サイト概要と特徴',
  description: 'AI Newsは、OpenAI、Anthropic、Google等の主要AI企業ニュースを自動収集・整理し、日本語で提供するオープンソースプラットフォームです。',
  openGraph: {
    title: 'AI Newsについて',
    description: 'AIの最新動向を自動収集・整理し、日本語で分かりやすく提供する情報プラットフォーム',
    type: 'website',
  },
}
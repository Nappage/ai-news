import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, ExternalLink, Building2 } from 'lucide-react'
import { getNewsData } from '@/lib/news'
import { NewsCard } from '@/components/news/NewsCard'

// 企業情報の定義
const companyInfo: Record<string, { name: string; description: string; website?: string }> = {
  openai: {
    name: 'OpenAI',
    description: 'ChatGPT、GPT-4、DALL-E、Whisperなど革新的なAIシステムを開発。人工汎用知能（AGI）の実現に向けて研究を進める世界最大手のAI企業の一つ。',
    website: 'https://openai.com'
  },
  anthropic: {
    name: 'Anthropic',
    description: 'AI安全性研究に特化したClaude（大規模言語モデル）を開発。Constitutional AIという手法で、より安全で有用なAIシステムの構築を目指す。',
    website: 'https://anthropic.com'
  },
  google: {
    name: 'Google',
    description: 'Bard、PaLM、Geminiなど先進的なAIモデルを開発。Google検索、Gmail、YouTube等のプロダクトにAI技術を統合し、AI研究をリードする。',
    website: 'https://ai.google'
  },
  meta: {
    name: 'Meta',
    description: 'LLaMA（Large Language Model Meta AI）シリーズを開発。オープンソースアプローチでAI研究コミュニティに貢献し、メタバース技術との融合を目指す。',
    website: 'https://ai.meta.com'
  },
  'hugging-face': {
    name: 'Hugging Face',
    description: 'AIモデルとデータセットのオープンプラットフォームを提供。Transformersライブラリで機械学習の民主化を推進し、AI開発者コミュニティの中心的存在。',
    website: 'https://huggingface.co'
  },
  others: {
    name: 'その他のAI企業',
    description: 'DeepSeek、Manus、Stability AI、Midjourney、RunwayMLなど、革新的なAI技術を開発する新興企業や専門企業のニュースを紹介。'
  }
}

// 有効な企業のリスト
const validCompanies = Object.keys(companyInfo)

interface CompanyPageProps {
  params: {
    company: string
  }
}

async function getNewsByCompany(companyId: string, limit: number = 20) {
  const newsData = await getNewsData()
  
  let filteredArticles
  
  if (companyId === 'hugging-face') {
    filteredArticles = newsData.articles.filter(article => 
      article.company === 'Hugging Face'
    )
  } else if (companyId === 'others') {
    // OpenAI、Anthropic、Google、Meta、Hugging Face以外の企業
    filteredArticles = newsData.articles.filter(article => 
      article.company && 
      !['OpenAI', 'Anthropic', 'Google', 'Meta', 'Hugging Face'].includes(article.company)
    )
  } else {
    // 通常の企業名マッチング
    const targetCompany = companyInfo[companyId]?.name
    filteredArticles = newsData.articles.filter(article => 
      article.company && article.company.toLowerCase() === targetCompany?.toLowerCase()
    )
  }
  
  // 発行日でソート（新しい順）
  return filteredArticles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { company } = params

  // 企業が有効かチェック
  if (!validCompanies.includes(company)) {
    notFound()
  }

  const companyData = companyInfo[company]
  const articles = await getNewsByCompany(company, 20)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* パンくずナビ */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/company" className="hover:text-foreground transition-colors">
            企業
          </Link>
          <span>/</span>
          <span className="text-foreground">{companyData.name}</span>
        </div>
      </nav>

      {/* 戻るボタン */}
      <div className="mb-6">
        <Link
          href="/company"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>企業一覧に戻る</span>
        </Link>
      </div>

      {/* ページヘッダー */}
      <div className="mb-12">
        <div className="flex items-start space-x-4 mb-6">
          <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {companyData.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {companyData.description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{articles.length}件の記事</span>
          </div>
          {companyData.website && (
            <a
              href={companyData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>公式サイト</span>
            </a>
          )}
        </div>
      </div>

      {/* ニュース記事一覧 */}
      {articles.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                size="medium"
              />
            ))}
          </div>

          {/* さらに読む */}
          {articles.length >= 20 && (
            <div className="text-center pt-8">
              <p className="text-muted-foreground mb-4">
                さらに多くの{companyData.name}関連ニュースをお探しですか？
              </p>
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <span>すべてのニュースを見る</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {companyData.name}の記事がまだありません
          </h3>
          <p className="text-muted-foreground mb-6">
            新しい記事が追加されるまでお待ちください。自動更新は毎日4回行われます。
          </p>
          <Link
            href="/company"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            他の企業を見る
          </Link>
        </div>
      )}
    </div>
  )
}

// 静的生成用のパラメータ生成
export async function generateStaticParams() {
  return validCompanies.map((company) => ({
    company: company,
  }))
}

// メタデータ生成
export async function generateMetadata({ params }: CompanyPageProps) {
  const { company } = params
  
  if (!validCompanies.includes(company)) {
    return {
      title: '企業が見つかりません - AI News'
    }
  }

  const companyData = companyInfo[company]
  
  return {
    title: `${companyData.name} - AI News`,
    description: companyData.description,
  }
}
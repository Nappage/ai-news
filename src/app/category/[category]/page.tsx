import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react'
import { getNewsByCategory } from '@/lib/news'
import { NewsCard } from '@/components/news/NewsCard'
import { NewsCategory } from '@/types/news'

// カテゴリ情報の定義
const categoryInfo: Record<string, { name: string; description: string }> = {
  llm: {
    name: 'LLM・モデル',
    description: '大規模言語モデル（LLM）の最新技術動向、新しいモデルのリリース情報、パフォーマンス比較など'
  },
  companies: {
    name: '企業動向',
    description: 'AI企業の最新ニュース、企業戦略、パートナーシップ、新サービスの発表など'
  },
  research: {
    name: '研究・論文',
    description: '最新の研究成果、学術論文、技術的ブレークスルー、研究機関の発表など'
  },
  tools: {
    name: 'ツール・アプリ',
    description: 'AIツールやアプリケーションの新リリース、アップデート、使用方法、レビューなど'
  },
  industry: {
    name: '業界・政策',
    description: 'AI業界の市場動向、政策・規制の変更、業界標準、法的な議論など'
  },
  funding: {
    name: '資金調達',
    description: 'AI企業の資金調達、投資ラウンド、買収・合併、ベンチャーキャピタルの動向など'
  }
}

// 有効なカテゴリのリスト
const validCategories = Object.keys(categoryInfo)

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params

  // カテゴリが有効かチェック
  if (!validCategories.includes(category)) {
    notFound()
  }

  const categoryData = categoryInfo[category]
  const articles = await getNewsByCategory(category as NewsCategory, 20)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* パンくずナビ */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/category" className="hover:text-foreground transition-colors">
            カテゴリ
          </Link>
          <span>/</span>
          <span className="text-foreground">{categoryData.name}</span>
        </div>
      </nav>

      {/* 戻るボタン */}
      <div className="mb-6">
        <Link
          href="/category"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>カテゴリ一覧に戻る</span>
        </Link>
      </div>

      {/* ページヘッダー */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {categoryData.name}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {categoryData.description}
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{articles.length}件の記事</span>
          </div>
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
                さらに多くの{categoryData.name}関連ニュースをお探しですか？
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
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {categoryData.name}の記事がまだありません
          </h3>
          <p className="text-muted-foreground mb-6">
            新しい記事が追加されるまでお待ちください。自動更新は毎日4回行われます。
          </p>
          <Link
            href="/category"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            他のカテゴリを見る
          </Link>
        </div>
      )}
    </div>
  )
}

// 静的生成用のパラメータ生成
export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category: category,
  }))
}

// メタデータ生成
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = params
  
  if (!validCategories.includes(category)) {
    return {
      title: 'カテゴリが見つかりません - AI News'
    }
  }

  const categoryData = categoryInfo[category]
  
  return {
    title: `${categoryData.name} - AI News`,
    description: categoryData.description,
  }
}
import { NewsArticle } from '@/types/news'
import { NewsCard } from '@/components/news/NewsCard'

interface HeroSectionProps {
  articles: NewsArticle[]
}

export function HeroSection({ articles }: HeroSectionProps) {
  const mainArticle = articles[0]
  const sideArticles = articles.slice(1, 3)

  if (!mainArticle) {
    return (
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">AI News</h1>
          <p className="text-xl text-muted-foreground">
            生成AI・LLM業界の最新ニュースを毎日お届け
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">AI News</h1>
        <p className="text-xl text-muted-foreground">
          生成AI・LLM業界の最新ニュースを毎日お届け
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* メイン記事 */}
        <div className="lg:col-span-2">
          <div className="relative">
            <NewsCard
              article={mainArticle}
              size="large"
              className="h-full"
            />
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                注目記事
              </span>
            </div>
          </div>
        </div>

        {/* サイド記事 */}
        <div className="space-y-6">
          {sideArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              size="small"
              className="w-full"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
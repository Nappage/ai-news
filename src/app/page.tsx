import { NewsCard } from '@/components/news/NewsCard'
import { HeroSection } from '@/components/sections/HeroSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { getFeaturedNews, getLatestNews } from '@/lib/news'

export default async function HomePage() {
  const featuredNews = await getFeaturedNews()
  const latestNews = await getLatestNews(6)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <HeroSection articles={featuredNews} />

      {/* Latest News Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">最新ニュース</h2>
          <p className="text-muted-foreground">生成AI・LLM業界の最新動向</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              size="medium"
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />
    </div>
  )
}
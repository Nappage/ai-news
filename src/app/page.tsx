import { NewsCard } from '@/components/news/NewsCard'
import { HeroSection } from '@/components/sections/HeroSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { NewsArticle } from '@/types/news'

// サンプルデータ（後でAPIから取得）
const sampleNews: NewsArticle[] = [
  {
    id: '1',
    title: 'OpenAI、GPT-4の新機能を発表 - マルチモーダル対応が大幅改善',
    summary: 'OpenAIは本日、GPT-4の大規模アップデートを発表しました。画像認識精度の向上と動画理解機能の追加により、より高度な視覚的推論が可能になります。',
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    source: 'OpenAI Blog',
    sourceUrl: 'https://openai.com/blog/gpt-4-turbo-with-vision',
    category: 'llm',
    company: 'OpenAI',
    imageUrl: '/images/openai-gpt4.jpg',
    tags: ['GPT-4', 'マルチモーダル', '画像認識'],
    featured: true,
  },
  {
    id: '2', 
    title: 'Anthropic Claude 3、ベンチマークでGPT-4を上回る性能を記録',
    summary: 'AnthropicのClaude 3 Opusが複数のベンチマークテストでGPT-4を上回る結果を示しました。特に数学的推論と長文理解において大幅な改善が見られます。',
    publishedAt: new Date('2024-01-14T15:30:00Z'),
    source: 'Anthropic',
    sourceUrl: 'https://anthropic.com/claude-3',
    category: 'llm',
    company: 'Anthropic',
    imageUrl: '/images/claude-3.jpg',
    tags: ['Claude 3', 'ベンチマーク', '性能向上'],
    featured: true,
  },
  {
    id: '3',
    title: 'Google Gemini Ultra、医療診断AIでの活用事例を公開',
    summary: 'GoogleはGemini Ultraを活用した医療診断支援システムの事例を発表。放射線画像の解析精度が従来比40%向上し、早期診断に貢献します。',
    publishedAt: new Date('2024-01-13T09:15:00Z'),
    source: 'Google AI Blog',
    sourceUrl: 'https://ai.googleblog.com/gemini-ultra-medical',
    category: 'companies',
    company: 'Google',
    imageUrl: '/images/gemini-medical.jpg',
    tags: ['Gemini Ultra', '医療AI', '画像診断'],
  },
  {
    id: '4',
    title: 'Meta、Llama 3の商用利用ライセンスを大幅緩和',
    summary: 'MetaはLlama 3の商用利用に関するライセンス条件を緩和し、より多くの企業での活用を促進します。オープンソースAIエコシステムの発展に寄与する取り組みです。',
    publishedAt: new Date('2024-01-12T12:45:00Z'),
    source: 'Meta AI',
    sourceUrl: 'https://ai.meta.com/llama-3-license',
    category: 'companies',
    company: 'Meta',
    imageUrl: '/images/llama-3.jpg',
    tags: ['Llama 3', 'オープンソース', 'ライセンス'],
  },
]

export default function HomePage() {
  const featuredNews = sampleNews.filter(article => article.featured)
  const latestNews = sampleNews.filter(article => !article.featured)

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
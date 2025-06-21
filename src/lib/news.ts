import { NewsArticle } from '@/types/news'
import fs from 'fs'
import path from 'path'

// データファイルのパス
const DATA_DIR = path.join(process.cwd(), 'src/data')
const NEWS_FILE = path.join(DATA_DIR, 'news.json')

// フォールバック用のサンプルデータ
const FALLBACK_NEWS: NewsArticle[] = [
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

interface NewsData {
  lastUpdated: string
  totalArticles: number
  articles: NewsArticle[]
}

// ニュースデータを読み込む
export async function getNewsData(): Promise<NewsData> {
  try {
    // ファイルが存在するかチェック
    if (!fs.existsSync(NEWS_FILE)) {
      console.warn('News data file not found, using fallback data')
      return {
        lastUpdated: new Date().toISOString(),
        totalArticles: FALLBACK_NEWS.length,
        articles: FALLBACK_NEWS
      }
    }

    const fileContent = fs.readFileSync(NEWS_FILE, 'utf8')
    const data: NewsData = JSON.parse(fileContent)
    
    // データを日付でソート
    data.articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    
    return data
  } catch (error) {
    console.error('Error reading news data:', error)
    return {
      lastUpdated: new Date().toISOString(),
      totalArticles: FALLBACK_NEWS.length,
      articles: FALLBACK_NEWS
    }
  }
}

// 注目記事を取得
export async function getFeaturedNews(): Promise<NewsArticle[]> {
  const data = await getNewsData()
  return data.articles.filter(article => article.featured).slice(0, 3)
}

// 最新記事を取得
export async function getLatestNews(limit = 10): Promise<NewsArticle[]> {
  const data = await getNewsData()
  return data.articles.slice(0, limit)
}

// カテゴリ別記事を取得
export async function getNewsByCategory(category: string, limit = 10): Promise<NewsArticle[]> {
  const data = await getNewsData()
  return data.articles
    .filter(article => article.category === category)
    .slice(0, limit)
}

// 企業別記事を取得
export async function getNewsByCompany(company: string, limit = 10): Promise<NewsArticle[]> {
  const data = await getNewsData()
  return data.articles
    .filter(article => article.company?.toLowerCase() === company.toLowerCase())
    .slice(0, limit)
}

// 記事をIDで取得
export async function getNewsById(id: string): Promise<NewsArticle | null> {
  const data = await getNewsData()
  return data.articles.find(article => article.id === id) || null
}

// 検索機能
export async function searchNews(query: string, limit = 10): Promise<NewsArticle[]> {
  const data = await getNewsData()
  const searchTerm = query.toLowerCase()
  
  return data.articles
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      article.summary.toLowerCase().includes(searchTerm) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      article.company?.toLowerCase().includes(searchTerm)
    )
    .slice(0, limit)
}
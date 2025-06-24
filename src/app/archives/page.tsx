import { Calendar, TrendingUp, Clock, Archive } from 'lucide-react'
import Link from 'next/link'
import { getNewsData } from '@/lib/news'
import { NewsCard } from '@/components/news/NewsCard'

// 月別にニュースをグループ化
interface MonthGroup {
  key: string;
  label: string;
  articles: any[];
}

function groupNewsByMonth(articles: any[]): MonthGroup[] {
  const grouped = articles.reduce((acc, article) => {
    const date = new Date(article.publishedAt)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthLabel = date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        key: monthKey,
        label: monthLabel,
        articles: []
      }
    }
    
    acc[monthKey].articles.push(article)
    return acc
  }, {} as Record<string, MonthGroup>)

  // 新しい月から順にソート
  return (Object.values(grouped) as MonthGroup[]).sort((a, b) => b.key.localeCompare(a.key))
}

// 統計情報の計算
function calculateStats(articles: any[]) {
  const totalArticles = articles.length
  const companies = new Set(articles.map(article => article.company).filter(Boolean))
  const categories = new Set(articles.map(article => article.category))
  
  // 最初と最後の記事の日付
  const sortedByDate = articles.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
  const oldestDate = sortedByDate[0]?.publishedAt
  const newestDate = sortedByDate[sortedByDate.length - 1]?.publishedAt
  
  return {
    totalArticles,
    companiesCount: companies.size,
    categoriesCount: categories.size,
    oldestDate,
    newestDate
  }
}

export default async function ArchivesPage() {
  const newsData = await getNewsData()
  const articles = newsData.articles || []
  
  const monthlyGroups = groupNewsByMonth(articles)
  const stats = calculateStats(articles)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダー */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <Archive className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-4xl font-bold text-foreground">ニュースアーカイブ</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          過去のAIニュースを月別に整理して閲覧できます
        </p>
      </div>

      {/* 統計情報 */}
      <div className="bg-card rounded-xl border border-border p-8 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">アーカイブ統計</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-primary/10 rounded-lg p-4 mb-3">
              <TrendingUp className="h-8 w-8 text-primary mx-auto" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.totalArticles}</div>
            <div className="text-sm text-muted-foreground">総記事数</div>
          </div>
          
          <div className="text-center">
            <div className="bg-green-500/10 rounded-lg p-4 mb-3">
              <Archive className="h-8 w-8 text-green-600 mx-auto" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.companiesCount}</div>
            <div className="text-sm text-muted-foreground">掲載企業数</div>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-500/10 rounded-lg p-4 mb-3">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.categoriesCount}</div>
            <div className="text-sm text-muted-foreground">カテゴリ数</div>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-500/10 rounded-lg p-4 mb-3">
              <Clock className="h-8 w-8 text-purple-600 mx-auto" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{monthlyGroups.length}</div>
            <div className="text-sm text-muted-foreground">アーカイブ月数</div>
          </div>
        </div>
        
        {stats.oldestDate && stats.newestDate && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            アーカイブ期間: {new Date(stats.oldestDate).toLocaleDateString('ja-JP')} 〜 {new Date(stats.newestDate).toLocaleDateString('ja-JP')}
          </div>
        )}
      </div>

      {/* 月別アーカイブ */}
      {monthlyGroups.length > 0 ? (
        <div className="space-y-12">
          {monthlyGroups.map((monthGroup) => (
            <section key={monthGroup.key} className="space-y-6">
              {/* 月ヘッダー */}
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{monthGroup.label}</h2>
                  <p className="text-muted-foreground">{monthGroup.articles.length}件の記事</p>
                </div>
              </div>

              {/* 記事リスト */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monthGroup.articles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    size="medium"
                  />
                ))}
              </div>

              {/* 区切り線 */}
              {monthGroup !== monthlyGroups[monthlyGroups.length - 1] && (
                <hr className="border-border" />
              )}
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            アーカイブがまだありません
          </h3>
          <p className="text-muted-foreground mb-6">
            ニュースが蓄積されると、ここに月別のアーカイブが表示されます
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            最新ニュースを見る
          </Link>
        </div>
      )}

      {/* フッターリンク */}
      <div className="mt-16 text-center">
        <div className="bg-muted/50 rounded-lg p-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">他の検索方法</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/search"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              キーワード検索
            </Link>
            <Link
              href="/category"
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              カテゴリ別
            </Link>
            <Link
              href="/company"
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              企業別
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'ニュースアーカイブ - AI News',
  description: '過去のAIニュースを月別に整理したアーカイブ。統計情報と合わせて履歴を確認できます。',
}
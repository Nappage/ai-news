import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, ExternalLink, Building2, Tag, Clock } from 'lucide-react'
import { getNewsData } from '@/lib/news'
import { NewsCard } from '@/components/news/NewsCard'

// 企業名をURLスラッグに変換
function getCompanySlug(company: string): string {
  const slugMap: Record<string, string> = {
    'OpenAI': 'openai',
    'Anthropic': 'anthropic',
    'Google': 'google',
    'Meta': 'meta',
    'Hugging Face': 'hugging-face',
  }
  return slugMap[company] || 'others'
}

interface NewsPageProps {
  params: {
    id: string
  }
}

// 個別記事の取得
async function getNewsById(id: string) {
  const newsData = await getNewsData()
  return newsData.articles.find(article => article.id === id)
}

// 関連記事の取得（同じカテゴリまたは企業）
async function getRelatedNews(currentArticle: any, limit: number = 3) {
  const newsData = await getNewsData()
  
  // 現在の記事を除外して関連記事を検索
  const relatedArticles = newsData.articles
    .filter(article => 
      article.id !== currentArticle.id && 
      (article.category === currentArticle.category || 
       article.company === currentArticle.company)
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
  
  return relatedArticles
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = params
  const article = await getNewsById(id)

  if (!article) {
    notFound()
  }

  const relatedNews = await getRelatedNews(article)
  const publishedDate = new Date(article.publishedAt)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* パンくずナビ */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href={`/category/${article.category}`} className="hover:text-foreground transition-colors">
            {article.category === 'llm' ? 'LLM・モデル' :
             article.category === 'companies' ? '企業動向' :
             article.category === 'research' ? '研究・論文' :
             article.category === 'tools' ? 'ツール・アプリ' :
             article.category === 'industry' ? '業界・政策' :
             article.category === 'funding' ? '資金調達' : article.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">記事詳細</span>
        </div>
      </nav>

      {/* 戻るボタン */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ニュース一覧に戻る</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* 記事メイン */}
        <article className="bg-card rounded-xl border border-border p-8 mb-12">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {article.title}
            </h1>
            
            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={publishedDate.toISOString()}>
                  {publishedDate.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <div className="flex items-center space-x-1">
                <Building2 className="h-4 w-4" />
                <span>{article.source}</span>
              </div>

              {article.company && (
                <Link 
                  href={`/company/${getCompanySlug(article.company)}`}
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <Tag className="h-4 w-4" />
                  <span>{article.company}</span>
                </Link>
              )}
            </div>

            {/* タグ */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* 記事本文 */}
          <div className="prose prose-lg max-w-none">
            {article.summary && (
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-3">概要</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {article.summary}
                </p>
              </div>
            )}

            {article.content && article.content !== article.summary ? (
              <div className="text-foreground leading-relaxed space-y-4">
                {article.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  詳細な記事内容は元記事をご確認ください
                </p>
              </div>
            )}
          </div>

          {/* 元記事リンク */}
          <div className="mt-8 pt-6 border-t border-border">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span>元記事を読む</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </article>

        {/* 関連記事 */}
        {relatedNews.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNews.map((relatedArticle) => (
                <NewsCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  size="medium"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// 静的生成用のパラメータ生成
export async function generateStaticParams() {
  const newsData = await getNewsData()
  
  return newsData.articles.map((article) => ({
    id: article.id,
  }))
}

// メタデータ生成
export async function generateMetadata({ params }: NewsPageProps) {
  const { id } = params
  const article = await getNewsById(id)
  
  if (!article) {
    return {
      title: '記事が見つかりません - AI News'
    }
  }
  
  return {
    title: `${article.title} - AI News`,
    description: article.summary || `${article.source}からの最新ニュース`,
    openGraph: {
      title: article.title,
      description: article.summary || `${article.source}からの最新ニュース`,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.source],
    },
  }
}
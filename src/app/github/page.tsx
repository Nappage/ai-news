import { Github, GitBranch, Star, ArrowLeft, Package } from 'lucide-react'
import Link from 'next/link'
import { getNewsData } from '@/lib/news'
import { NewsCard } from '@/components/news/NewsCard'
import { Card, CardContent } from '@/components/ui/card'

export default async function GitHubPage() {
  const newsData = await getNewsData()
  const githubArticles = newsData.githubArticles || []

  // GitHub記事を種類別に分類
  const officialReleases = githubArticles.filter(article => 
    article.source.includes('GitHub') && !article.source.includes('Search') && !article.source.includes('Org')
  )
  
  const orgUpdates = githubArticles.filter(article => 
    article.source.includes('GitHub Org')
  )
  
  const discoveries = githubArticles.filter(article => 
    article.source.includes('GitHub Search')
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          ホームに戻る
        </Link>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 shadow-lg">
            <Github className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">GitHub</h1>
            <p className="text-muted-foreground">リポジトリのリリース・アップデート情報</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">公式リリース</p>
                <p className="font-semibold text-foreground">{officialReleases.length}件</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <GitBranch className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">組織アップデート</p>
                <p className="font-semibold text-foreground">{orgUpdates.length}件</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">総GitHub記事</p>
                <p className="font-semibold text-foreground">{githubArticles.length}件</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Articles by Section */}
      <div className="space-y-12">
        {/* Official Releases */}
        {officialReleases.length > 0 && (
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">公式リリース</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              主要AI企業の公式リポジトリからの最新リリース情報
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {officialReleases.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  size="medium"
                />
              ))}
            </div>
          </section>
        )}

        {/* Organization Updates */}
        {orgUpdates.length > 0 && (
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <GitBranch className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">組織アップデート</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Anthropic、OpenAI、Googleなどの組織による最新リポジトリ更新
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orgUpdates.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  size="medium"
                />
              ))}
            </div>
          </section>
        )}

        {/* Community Discoveries */}
        {discoveries.length > 0 && (
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">注目リポジトリ</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              AI・機械学習分野で注目を集めている新しいリポジトリ
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discoveries.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  size="medium"
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {githubArticles.length === 0 && (
          <div className="text-center py-12">
            <Github className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              GitHub記事が見つかりません
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              現在、表示できるGitHub記事がありません。しばらく後にもう一度確認してください。
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              メインニュースを見る
            </Link>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="mt-12 p-6 bg-muted/30 rounded-lg">
        <h3 className="font-semibold text-foreground mb-2">GitHubについて</h3>
        <p className="text-sm text-muted-foreground">
          このセクションでは、AI・機械学習分野の主要リポジトリのリリース情報、
          組織のアップデート、注目を集めている新しいプロジェクトを表示しています。
          公式のリリース情報から最新の研究コード、実験的なプロジェクトまで幅広くカバーしています。
        </p>
      </div>
    </div>
  )
}
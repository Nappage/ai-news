import { Users, Github, MessageSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getNewsData } from '@/lib/news'
import { NewsCard } from '@/components/NewsCard'
import { Card, CardContent } from '@/components/ui/card'

export default async function CommunityPage() {
  const newsData = await getNewsData()
  const communityArticles = newsData.communityArticles || []

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
          <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 shadow-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">コミュニティ</h1>
            <p className="text-muted-foreground">開発者コミュニティからの最新情報</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Github className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">GitHub発見</p>
                <p className="font-semibold text-foreground">
                  {communityArticles.filter(a => a.source?.includes('GitHub Search')).length}件
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">フォーラム投稿</p>
                <p className="font-semibold text-foreground">
                  {communityArticles.filter(a => a.source?.includes('Reddit')).length}件
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">総コミュニティ記事</p>
                <p className="font-semibold text-foreground">{communityArticles.length}件</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Articles */}
      <div className="space-y-8">
        {communityArticles.length > 0 ? (
          <>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">コミュニティ記事</h2>
              <p className="text-muted-foreground mb-6">
                開発者コミュニティからの最新プロジェクト、ディスカッション、発見をご覧ください
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  showExcerpt={true}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              コミュニティ記事が見つかりません
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              現在、表示できるコミュニティ記事がありません。しばらく後にもう一度確認してください。
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
        <h3 className="font-semibold text-foreground mb-2">コミュニティについて</h3>
        <p className="text-sm text-muted-foreground">
          このセクションでは、GitHub検索、Redditディスカッション、Hacker Newsなどから収集された
          開発者コミュニティの情報を表示しています。企業の公式発表とは異なり、
          個人の開発者や研究者による実験的なプロジェクトや議論が含まれます。
        </p>
      </div>
    </div>
  )
}
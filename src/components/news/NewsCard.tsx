import Link from 'next/link'
import Image from 'next/image'
import { Clock, ExternalLink, Tag } from 'lucide-react'
import { NewsArticle } from '@/types/news'
import { formatRelativeTime, truncateText } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface NewsCardProps {
  article: NewsArticle
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function NewsCard({ article, size = 'medium', className }: NewsCardProps) {
  const cardSizes = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-2xl',
  }

  const imageSizes = {
    small: { width: 300, height: 150 },
    medium: { width: 400, height: 200 },
    large: { width: 600, height: 300 },
  }

  return (
    <article className={cn(
      'group bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]',
      cardSizes[size],
      className
    )}>
      {/* サムネイル画像 */}
      {article.imageUrl && (
        <div className="relative overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={imageSizes[size].width}
            height={imageSizes[size].height}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {article.company && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                {article.company}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        {/* カテゴリとタグ */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
            {getCategoryLabel(article.category)}
          </span>
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-xs text-muted-foreground">
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* タイトル */}
        <Link href={`/news/${article.id}`} className="block group">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
            {size === 'small' ? truncateText(article.title, 60) : article.title}
          </h3>
        </Link>

        {/* 概要 */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {size === 'small' ? truncateText(article.summary, 100) : article.summary}
        </p>

        {/* メタ情報 */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(article.publishedAt)}
            </span>
            <span>{article.source}</span>
          </div>
          
          <Link
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            元記事
          </Link>
        </div>
      </div>
    </article>
  )
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    llm: 'LLM・モデル',
    companies: '企業動向',
    research: '研究・論文',
    tools: 'ツール・アプリ',
    industry: '業界・政策',
    funding: '資金調達',
    policy: '政策・規制',
    community: 'コミュニティ',
  }
  return labels[category] || category
}
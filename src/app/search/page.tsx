'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Filter, Calendar, Building2, Tag, X } from 'lucide-react'
import { NewsCard } from '@/components/news/NewsCard'
import { NewsArticle } from '@/types/news'

interface SearchFilters {
  category: string
  company: string
  dateRange: string
}

const categories = [
  { id: 'all', name: 'すべて' },
  { id: 'llm', name: 'LLM・モデル' },
  { id: 'companies', name: '企業動向' },
  { id: 'research', name: '研究・論文' },
  { id: 'tools', name: 'ツール・アプリ' },
  { id: 'industry', name: '業界・政策' },
  { id: 'funding', name: '資金調達' },
]

const companies = [
  { id: 'all', name: 'すべて' },
  { id: 'OpenAI', name: 'OpenAI' },
  { id: 'Anthropic', name: 'Anthropic' },
  { id: 'Google', name: 'Google' },
  { id: 'Meta', name: 'Meta' },
  { id: 'Hugging Face', name: 'Hugging Face' },
  { id: 'others', name: 'その他' },
]

const dateRanges = [
  { id: 'all', name: 'すべて' },
  { id: '7days', name: '過去7日' },
  { id: '30days', name: '過去30日' },
  { id: '90days', name: '過去90日' },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    company: 'all',
    dateRange: 'all'
  })
  const [showFilters, setShowFilters] = useState(false)

  // URL パラメータから初期検索クエリを取得
  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  // ニュースデータの取得
  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/data/news.json')
        const newsData = await response.json()
        setArticles(newsData.articles || [])
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // フィルタリングと検索の実行
  const filteredArticles = useMemo(() => {
    let filtered = articles

    // テキスト検索
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        (article.content && article.content.toLowerCase().includes(query)) ||
        article.company?.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // カテゴリフィルタ
    if (filters.category !== 'all') {
      filtered = filtered.filter(article => article.category === filters.category)
    }

    // 企業フィルタ
    if (filters.company !== 'all') {
      if (filters.company === 'others') {
        filtered = filtered.filter(article => 
          article.company && 
          !['OpenAI', 'Anthropic', 'Google', 'Meta', 'Hugging Face'].includes(article.company)
        )
      } else {
        filtered = filtered.filter(article => article.company === filters.company)
      }
    }

    // 日付フィルタ
    if (filters.dateRange !== 'all') {
      const now = new Date()
      const daysAgo = {
        '7days': 7,
        '30days': 30,
        '90days': 90
      }[filters.dateRange] || 0

      const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(article => new Date(article.publishedAt) >= cutoffDate)
    }

    // 新しい順にソート
    return filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }, [articles, searchQuery, filters])

  const handleFilterChange = (filterType: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: 'all',
      company: 'all',
      dateRange: 'all'
    })
    setSearchQuery('')
  }

  const activeFiltersCount = Object.values(filters).filter(value => value !== 'all').length + (searchQuery ? 1 : 0)

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">検索準備中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダー */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">ニュース検索</h1>
        <p className="text-muted-foreground">
          キーワード、企業名、カテゴリからAIニュースを検索できます
        </p>
      </div>

      {/* 検索バー */}
      <div className="bg-card rounded-lg border border-border p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="キーワードを入力..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>フィルタ</span>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* フィルタパネル */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* カテゴリフィルタ */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Tag className="inline h-4 w-4 mr-1" />
                  カテゴリ
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 企業フィルタ */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Building2 className="inline h-4 w-4 mr-1" />
                  企業
                </label>
                <select
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                >
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 日付フィルタ */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  期間
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                >
                  {dateRanges.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* フィルタクリア */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>フィルタをクリア</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 検索結果 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          検索結果 ({filteredArticles.length}件)
        </h2>
        {searchQuery && (
          <p className="text-muted-foreground">
            「{searchQuery}」の検索結果
          </p>
        )}
      </div>

      {/* 結果表示 */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              size="medium"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            検索結果が見つかりませんでした
          </h3>
          <p className="text-muted-foreground mb-6">
            別のキーワードやフィルタで再度お試しください
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              すべてのニュースを見る
            </Link>
            <Link
              href="/category"
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              カテゴリから探す
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}


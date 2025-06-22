import { Building2, Users, TrendingUp, Globe, Zap, Brain } from 'lucide-react'
import Link from 'next/link'
import { getNewsData } from '@/lib/news'

const companies = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'ChatGPT、GPT-4、DALL-Eなどの革新的AIを開発',
    icon: Brain,
    color: 'from-emerald-500 to-emerald-600',
    href: '/company/openai',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Claude、安全性に重点を置いたAI研究開発',
    icon: Users,
    color: 'from-orange-500 to-orange-600',
    href: '/company/anthropic',
  },
  {
    id: 'google',
    name: 'Google',
    description: 'Bard、PaLM、Geminiなどの大規模言語モデル',
    icon: Globe,
    color: 'from-blue-500 to-blue-600',
    href: '/company/google',
  },
  {
    id: 'meta',
    name: 'Meta',
    description: 'LLaMA、研究とオープンソースAIに注力',
    icon: TrendingUp,
    color: 'from-blue-600 to-purple-600',
    href: '/company/meta',
  },
  {
    id: 'hugging-face',
    name: 'Hugging Face',
    description: 'AIモデルとツールのオープンプラットフォーム',
    icon: Zap,
    color: 'from-yellow-500 to-yellow-600',
    href: '/company/hugging-face',
  },
  {
    id: 'others',
    name: 'その他企業',
    description: 'DeepSeek、Manus、その他のAI企業',
    icon: Building2,
    color: 'from-gray-500 to-gray-600',
    href: '/company/others',
  },
]

export default async function CompanyPage() {
  const newsData = await getNewsData()

  // 企業別の記事数を計算
  const companyStats = companies.map(company => {
    let count = 0
    
    if (company.id === 'hugging-face') {
      count = newsData.articles.filter(article => 
        article.company === 'Hugging Face'
      ).length
    } else if (company.id === 'others') {
      // OpenAI、Anthropic、Google、Meta、Hugging Face以外の企業
      count = newsData.articles.filter(article => 
        article.company && 
        !['OpenAI', 'Anthropic', 'Google', 'Meta', 'Hugging Face'].includes(article.company)
      ).length
    } else {
      // 通常の企業名マッチング（大文字小文字を考慮）
      count = newsData.articles.filter(article => 
        article.company && article.company.toLowerCase() === company.name.toLowerCase()
      ).length
    }
    
    return { ...company, count }
  })

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">AI企業ニュース</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          各AI企業の最新動向、製品リリース、研究成果をチェックしましょう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companyStats.map((company) => {
          const Icon = company.icon
          return (
            <Link
              key={company.id}
              href={company.href}
              className="group block bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${company.color} shadow-lg flex-shrink-0`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {company.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {company.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {company.count}件の記事
                    </span>
                    <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">すべてのニュース</h2>
        <p className="text-muted-foreground mb-6">
          企業に関係なく、すべての最新ニュースを確認したい場合
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          ホームページに戻る
        </Link>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'AI企業ニュース - AI News',
  description: '主要AI企業（OpenAI、Anthropic、Google、Meta、Hugging Faceなど）の最新ニュースと動向をチェック',
}
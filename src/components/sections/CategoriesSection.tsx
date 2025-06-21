import Link from 'next/link'
import { Brain, Building2, FileText, Wrench, Scale, TrendingUp } from 'lucide-react'

const categories = [
  {
    id: 'llm',
    name: 'LLM・モデル',
    description: '大規模言語モデルの最新動向',
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
    href: '/category/llm',
  },
  {
    id: 'companies',
    name: '企業動向',
    description: 'AI企業の最新ニュース',
    icon: Building2,
    color: 'from-green-500 to-green-600',
    href: '/category/companies',
  },
  {
    id: 'research',
    name: '研究・論文',
    description: '最新の研究成果と論文',
    icon: FileText,
    color: 'from-purple-500 to-purple-600',
    href: '/category/research',
  },
  {
    id: 'tools',
    name: 'ツール・アプリ',
    description: 'AIツールとアプリケーション',
    icon: Wrench,
    color: 'from-orange-500 to-orange-600',
    href: '/category/tools',
  },
  {
    id: 'industry',
    name: '業界・政策',
    description: '業界動向と政策・規制',
    icon: Scale,
    color: 'from-red-500 to-red-600',
    href: '/category/industry',
  },
  {
    id: 'funding',
    name: '資金調達',
    description: 'AI企業の投資・買収情報',
    icon: TrendingUp,
    color: 'from-yellow-500 to-yellow-600',
    href: '/category/funding',
  },
]

export function CategoriesSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">カテゴリ別ニュース</h2>
          <p className="text-muted-foreground text-lg">
            関心のある分野から最新情報をチェック
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    最新記事をチェック
                  </span>
                  <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
import { FileText, AlertTriangle, Scale, Users, ExternalLink, Shield } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダー */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <FileText className="h-12 w-12 text-primary mr-4" />
          <h1 className="text-4xl font-bold text-foreground">利用規約</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI News（以下「当サイト」）をご利用いただく際の規約について説明いたします
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          最終更新日: 2025年6月24日
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* 利用規約への同意 */}
        <section className="bg-card rounded-xl border border-border p-8">
          <div className="flex items-center mb-6">
            <Scale className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">利用規約への同意</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              当サイトをご利用いただくことで、本利用規約に同意したものとみなします。
              本規約に同意いただけない場合は、当サイトのご利用をお控えください。
            </p>
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground font-medium">
                  当サイトは完全無料でご利用いただけるオープンソースプロジェクトです。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* サービス内容 */}
        <section>
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">サービス内容</h2>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                当サイトは、AI業界の最新ニュース・情報を自動収集し、カテゴリ別に整理して提供するプラットフォームです。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">提供サービス</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>AIニュースの自動収集・配信</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>カテゴリ・企業別ニュース整理</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>検索・フィルタリング機能</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>アーカイブ・統計情報</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">サービス特徴</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>完全無料でご利用可能</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>ユーザー登録不要</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>オープンソースプロジェクト</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>24時間自動更新</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 利用上の注意事項 */}
        <section>
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">利用上の注意事項</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">禁止行為</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>以下の行為は禁止されています：</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                      <span>当サイトへの不正アクセス</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                      <span>サーバーへの過度な負荷をかける行為</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                      <span>当サイトの運営を妨害する行為</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                      <span>他の利用者への迷惑行為</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                      <span>法令に違反する行為</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                      <span>当サイトの信用を損なう行為</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">コンテンツの利用について</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  当サイトで提供されるニュース情報は、各ニュース元サイト（OpenAI、Anthropic、Google等）から自動収集されています。
                </p>
                <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <ExternalLink className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground font-medium mb-2">著作権について</p>
                      <p className="text-sm">
                        各記事の著作権は元の配信者に帰属します。詳細な内容については、
                        各記事の「元記事を読む」リンクから原文をご確認ください。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 免責事項 */}
        <section>
          <div className="flex items-center mb-6">
            <Shield className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">免責事項</h2>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="space-y-4 text-muted-foreground">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">情報の正確性について</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 自動収集されたニュース情報の正確性は保証いたしません</li>
                    <li>• 情報の更新遅延が発生する場合があります</li>
                    <li>• 重要な決定は必ず原文をご確認ください</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">サービスの可用性について</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• サービスの中断・停止の可能性があります</li>
                    <li>• メンテナンスによる一時的な利用不可</li>
                    <li>• システム障害による影響</li>
                  </ul>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium mb-2">重要な免責事項</p>
                    <p className="text-sm">
                      当サイトの利用により生じたいかなる損害についても、運営者は一切の責任を負いません。
                      投資や重要な意思決定を行う際は、必ず公式情報をご確認ください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* サービス変更・終了 */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">サービスの変更・終了</h2>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                当サイトは、予告なくサービス内容の変更、追加、削除を行う場合があります。
                また、以下の場合にはサービスを一時停止または終了することがあります：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                    <span>システムメンテナンス時</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                    <span>サーバー障害・自然災害</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                    <span>法令変更による対応</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                    <span>その他運営上の理由</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 準拠法・管轄裁判所 */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">準拠法・管轄裁判所</h2>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                本利用規約は日本法に準拠し、当サイトに関する一切の紛争については、
                東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </div>
          </div>
        </section>

        {/* 規約の変更 */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">本規約の変更</h2>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                当サイトは、必要に応じて本利用規約を変更することがあります。
                重要な変更については、サイト上で事前に告知いたします。
              </p>
              <p>
                変更後も当サイトをご利用いただくことで、変更後の利用規約に同意したものとみなします。
              </p>
            </div>
          </div>
        </section>

        {/* お問い合わせ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">お問い合わせ</h2>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-muted-foreground mb-4">
              本利用規約に関するご質問やサービスについてのお問い合わせは、
              以下のリンクからご連絡ください。
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/Nappage/ai-news/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                GitHub Issues でお問い合わせ
              </a>
              <Link
                href="/about"
                className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
              >
                サイトについて
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
              >
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export const metadata = {
  title: '利用規約 - AI News',
  description: 'AI Newsの利用規約。サービス利用時の注意事項、禁止行為、免責事項について説明します。',
  openGraph: {
    title: '利用規約 - AI News',
    description: 'AI Newsサービス利用に関する規約と注意事項',
    type: 'website',
  },
}
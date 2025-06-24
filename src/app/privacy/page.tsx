import { Shield, Eye, Cookie, Database, Lock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダー */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Shield className="h-12 w-12 text-primary mr-4" />
          <h1 className="text-4xl font-bold text-foreground">プライバシーポリシー</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI News（以下「当サイト」）における個人情報の取り扱いについて説明いたします
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          最終更新日: 2025年6月24日
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* 基本方針 */}
        <section className="bg-card rounded-xl border border-border p-8">
          <div className="flex items-center mb-6">
            <Eye className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">基本方針</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              当サイトは、AIニュースの自動収集・配信を目的とした情報プラットフォームです。
              ユーザーの個人情報の保護を重要視し、以下の方針に基づいて運営しています。
            </p>
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground font-medium">
                  当サイトでは、ユーザー登録や個人情報の入力を一切求めておりません。
                  完全匿名でご利用いただけます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 収集する情報 */}
        <section>
          <div className="flex items-center mb-6">
            <Database className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">収集する情報</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">収集しない情報</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  個人を特定できる情報
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  メールアドレス
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  電話番号
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  住所・氏名
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  ユーザーアカウント情報
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">自動収集される情報</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  アクセス統計（匿名）
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  ページビュー数
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  参照元サイト情報
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  ブラウザの種類
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  利用OS情報
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cookie使用について */}
        <section>
          <div className="flex items-center mb-6">
            <Cookie className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">Cookieの使用について</h2>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                当サイトでは、ユーザビリティ向上のために以下のCookieを使用する場合があります：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">必須Cookie</h4>
                  <p className="text-sm">サイトの基本機能を提供するために必要</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">機能Cookie</h4>
                  <p className="text-sm">ダークモード設定など、ユーザー設定の保存</p>
                </div>
              </div>
              <p className="text-sm">
                <strong>注意:</strong> 当サイトでは、広告配信やトラッキング目的のCookieは一切使用しておりません。
              </p>
            </div>
          </div>
        </section>

        {/* 第三者サービス */}
        <section>
          <div className="flex items-center mb-6">
            <Lock className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">第三者サービスについて</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">GitHub Pages</h3>
              <p className="text-muted-foreground mb-3">
                当サイトはGitHub Pagesでホスティングされています。GitHubのプライバシーポリシーが適用されます。
              </p>
              <a 
                href="https://docs.github.com/ja/site-policy/privacy-policies/github-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                GitHub プライバシーに関する声明 →
              </a>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">外部リンク</h3>
              <p className="text-muted-foreground">
                当サイトから外部サイト（OpenAI、Anthropic、Google等のニュース元）へのリンクが含まれていますが、
                これらのサイトのプライバシーポリシーについては、各サイトの方針に従います。
              </p>
            </div>
          </div>
        </section>

        {/* データ保護 */}
        <section>
          <div className="flex items-center mb-6">
            <Shield className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">データ保護・セキュリティ</h2>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                当サイトでは、以下のセキュリティ対策を実施しています：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>HTTPS暗号化通信</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>静的サイト生成による安全性確保</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>オープンソースによる透明性</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>個人情報の非保存</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>定期的なセキュリティ更新</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>最小限のデータ収集</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 本ポリシーの変更 */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">本ポリシーの変更について</h2>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                当サイトは、法令の変更やサービスの向上に伴い、本プライバシーポリシーを予告なく変更する場合があります。
              </p>
              <p>
                重要な変更がある場合は、サイト上で告知いたします。定期的に本ページをご確認ください。
              </p>
            </div>
          </div>
        </section>

        {/* お問い合わせ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">お問い合わせ</h2>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-muted-foreground mb-4">
              本プライバシーポリシーに関するご質問やご不明な点がございましたら、
              以下のリンクからお問い合わせください。
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
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'プライバシーポリシー - AI News',
  description: 'AI Newsのプライバシーポリシー。個人情報の取り扱い、Cookie使用、データ保護について説明します。',
  openGraph: {
    title: 'プライバシーポリシー - AI News',
    description: 'AI Newsにおける個人情報保護とプライバシーに関する方針',
    type: 'website',
  },
}
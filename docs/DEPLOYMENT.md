# GitHub Pages デプロイ設定計画

## 🚀 デプロイ戦略

### 基本方針
- **GitHub Pages**: 無料の静的サイトホスティング
- **自動デプロイ**: GitHub Actions による CI/CD
- **独自ドメイン**: 将来的な独自ドメイン対応
- **HTTPS**: 自動SSL証明書

### デプロイフロー
```
コード変更 → GitHub Push → Actions実行 → ビルド → デプロイ → サイト更新
```

## 📁 リポジトリ構成

### ブランチ戦略
```
main                 # メインブランチ (本番環境)
├── develop         # 開発ブランチ
├── feature/*       # 機能開発ブランチ
└── hotfix/*       # 緊急修正ブランチ
```

### ディレクトリ構造
```
ai-news/
├── .github/
│   └── workflows/
│       ├── deploy.yml        # デプロイワークフロー
│       ├── fetch-news.yml    # ニュース取得
│       └── test.yml          # テスト実行
├── app/                      # Next.js アプリ
├── data/                     # ニュースデータ  
├── scripts/                  # 自動化スクリプト
├── public/                   # 静的ファイル
├── docs/                     # ドキュメント
├── next.config.js           # Next.js設定
├── package.json
└── README.md
```

## ⚙️ GitHub Actions ワークフロー

### 1. デプロイワークフロー (.github/workflows/deploy.yml)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 2. ニュース取得ワークフロー (.github/workflows/fetch-news.yml)

```yaml
name: Fetch Latest News

on:
  schedule:
    # 毎日 UTC 0:00, 6:00, 12:00, 18:00 に実行
    - cron: '0 0,6,12,18 * * *'
  workflow_dispatch: # 手動実行可能

jobs:
  fetch-news:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Fetch news
        run: npm run fetch-news
        env:
          NEWS_API_KEY: ${{ secrets.NEWS_API_KEY }}
          REDDIT_CLIENT_ID: ${{ secrets.REDDIT_CLIENT_ID }}
          REDDIT_CLIENT_SECRET: ${{ secrets.REDDIT_CLIENT_SECRET }}
          
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add data/
          git diff --staged --quiet || git commit -m "Update news data $(date)"
          git push
```

## 🔧 Next.js 設定

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ai-news' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ai-news/' : '',
}

module.exports = nextConfig
```

### package.json スクリプト
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "fetch-news": "node scripts/fetch-news.js",
    "deploy": "npm run build && touch out/.nojekyll"
  }
}
```

## 🌐 ドメイン設定

### GitHub Pages URL
- **デフォルト**: `https://[username].github.io/ai-news`
- **カスタムドメイン**: `https://ai-news.example.com` (将来)

### カスタムドメイン設定手順
1. ドメイン取得 (例: ai-news.com)
2. DNS設定 (CNAME レコード)
3. GitHub Settings でカスタムドメイン設定
4. HTTPS強制有効化

## 🔐 環境変数・シークレット

### GitHub Secrets
```
NEWS_API_KEY           # News API キー
REDDIT_CLIENT_ID       # Reddit API クライアントID
REDDIT_CLIENT_SECRET   # Reddit API クライアントシークレット
OPENAI_API_KEY         # OpenAI API キー (将来)
```

### 環境変数
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://[username].github.io/ai-news
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics (将来)
```

## 📊 監視・分析

### GitHub Pages 統計
- ページビュー数
- 訪問者数
- トラフィック分析

### 将来の拡張
- Google Analytics 4
- Search Console
- Core Web Vitals monitoring

## 🛠️ トラブルシューティング

### よくある問題と解決方法

#### 1. ビルドエラー
```bash
# ローカルでビルド確認
npm run build

# 依存関係の問題
npm ci
```

#### 2. 画像が表示されない
- `next.config.js` で `images.unoptimized: true` 設定
- 絶対パスの使用

#### 3. CSS が適用されない
- `assetPrefix` の設定確認
- `basePath` の設定確認

#### 4. 404 エラー
- `trailingSlash: true` 設定
- `.nojekyll` ファイルの配置

## 🔄 デプロイ手順

### 初回セットアップ
1. GitHubリポジトリ作成
2. ローカル開発環境構築
3. GitHub Actions ワークフロー設定
4. GitHub Pages 有効化
5. 初回デプロイ実行

### 日常的な更新
1. 機能開発・修正
2. ローカルテスト
3. mainブランチにpush
4. 自動デプロイ実行
5. サイト更新確認

### 緊急時の対応
1. hotfixブランチ作成
2. 緊急修正実装
3. mainブランチにマージ
4. 即座にデプロイ

## 📈 パフォーマンス最適化

### ビルド最適化
- Tree shaking
- Code splitting
- Image optimization
- CSS purging

### キャッシュ戦略
- Static files: 1年
- HTML: 1時間
- API data: 10分

---

**更新日**: 2025年6月21日  
**バージョン**: 1.0
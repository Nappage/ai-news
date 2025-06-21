# サイト構造・デザイン仕様書

## 🎨 デザインコンセプト

### テーマ
- **モダン**: 最新のデザイントレンドを採用
- **ミニマル**: 情報の視認性を重視したクリーンなデザイン
- **プロフェッショナル**: 信頼性のあるニュースサイトらしい品格
- **アクセシブル**: 誰でも使いやすいユーザビリティ

### カラーパレット

#### ライトテーマ
```css
:root {
  --primary: #0066cc;        /* メインブルー */
  --primary-dark: #0052a3;   /* ホバー時 */
  --secondary: #6b7280;      /* セカンダリグレー */
  --accent: #10b981;         /* アクセントグリーン */
  --background: #ffffff;     /* 背景白 */
  --surface: #f8fafc;        /* カード背景 */
  --text-primary: #1f2937;   /* メインテキスト */
  --text-secondary: #6b7280; /* セカンダリテキスト */
  --border: #e5e7eb;         /* ボーダー */
}
```

#### ダークテーマ
```css
[data-theme="dark"] {
  --primary: #3b82f6;        /* メインブルー */
  --primary-dark: #2563eb;   /* ホバー時 */
  --secondary: #9ca3af;      /* セカンダリグレー */
  --accent: #10b981;         /* アクセントグリーン */
  --background: #0f172a;     /* 背景ダーク */
  --surface: #1e293b;        /* カード背景 */
  --text-primary: #f1f5f9;   /* メインテキスト */
  --text-secondary: #94a3b8; /* セカンダリテキスト */
  --border: #334155;         /* ボーダー */
}
```

### タイポグラフィ
- **フォントファミリー**: Inter, system-ui, sans-serif
- **見出し**: 700 (Bold)
- **本文**: 400 (Regular)
- **キャプション**: 300 (Light)

## 📱 レスポンシブブレークポイント

```css
/* Mobile First */
@media (min-width: 640px)  { /* sm: タブレット縦 */ }
@media (min-width: 768px)  { /* md: タブレット横 */ }
@media (min-width: 1024px) { /* lg: デスクトップ */ }
@media (min-width: 1280px) { /* xl: 大画面 */ }
@media (min-width: 1536px) { /* 2xl: 超大画面 */ }
```

## 🏗️ サイト構造

### ページ構成
```
/                    # ホーム (最新ニュース一覧)
├── /news/[slug]     # 個別ニュース記事
├── /category/[cat]  # カテゴリ別一覧
├── /company/[name]  # 企業別ニュース
├── /search          # 検索結果
├── /about           # サイトについて
└── /archives        # アーカイブ
```

### ナビゲーション構造
```
Header
├── Logo
├── Main Navigation
│   ├── Home
│   ├── Categories ▼
│   │   ├── LLM/Models
│   │   ├── Companies
│   │   ├── Research
│   │   ├── Tools
│   │   └── Industry
│   ├── Companies ▼
│   │   ├── OpenAI
│   │   ├── Anthropic
│   │   ├── Google
│   │   ├── Meta
│   │   └── More...
│   └── Search
└── Theme Toggle
```

## 📄 ページレイアウト

### ホームページ
```
Header (固定)
├── Hero Section
│   ├── 今日のトップニュース (3-4記事)
│   └── カルーセル or グリッド表示
├── Latest News
│   ├── 最新ニュース一覧
│   ├── 無限スクロール or ページネーション
│   └── フィルター機能
├── Categories Section
│   ├── カテゴリ別ハイライト
│   └── 各カテゴリの注目記事
└── Footer
```

### 記事詳細ページ
```
Header
├── Breadcrumb
├── Article Header
│   ├── タイトル
│   ├── 公開日時
│   ├── カテゴリタグ
│   ├── 企業タグ
│   └── シェアボタン
├── Article Content
│   ├── サムネイル画像
│   ├── 記事本文
│   ├── 引用元リンク
│   └── 関連タグ
├── Related Articles
│   └── 関連記事 (3-6件)
└── Footer
```

## 🎯 UIコンポーネント設計

### カードコンポーネント
```typescript
interface NewsCard {
  id: string;
  title: string;
  summary: string;
  publishedAt: Date;
  source: string;
  sourceUrl: string;
  category: string;
  company?: string;
  imageUrl?: string;
  tags: string[];
}
```

#### サイズバリエーション
- **Large**: ヒーロー記事用 (1200x600px)
- **Medium**: 一覧メイン (600x300px)
- **Small**: サイドバー・関連記事 (300x150px)

### フィルター・検索UI
```typescript
interface FilterOptions {
  categories: string[];
  companies: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
  sortBy: 'latest' | 'popular' | 'relevance';
}
```

## 🎭 アニメーション仕様

### ページ遷移
- **Duration**: 300ms
- **Easing**: ease-in-out
- **Type**: フェードイン + スライド

### カードホバー
- **Transform**: scale(1.02)
- **Shadow**: 0 10px 25px rgba(0,0,0,0.1)
- **Duration**: 200ms

### ローディング
- **Skeleton**: カード形状のスケルトン
- **Spinner**: 中央配置のスピナー
- **Progressive**: 段階的なコンテンツ表示

## 📊 レイアウトパターン

### デスクトップ (1024px+)
```
┌─────────────────────────────────────────┐
│                Header                    │
├─────────────────────────────────────────┤
│           Hero Section (70%)            │
├─────────────────────┬───────────────────┤
│                     │                   │
│   Main Content      │    Sidebar        │
│      (70%)          │     (30%)         │
│                     │                   │
├─────────────────────┴───────────────────┤
│                Footer                   │
└─────────────────────────────────────────┘
```

### タブレット (768px-1023px)
```
┌─────────────────────────────────────────┐
│                Header                    │
├─────────────────────────────────────────┤
│              Hero Section               │
├─────────────────────────────────────────┤
│                                         │
│            Main Content                 │
│              (100%)                     │
│                                         │
├─────────────────────────────────────────┤
│                Footer                   │
└─────────────────────────────────────────┘
```

### モバイル (〜767px)
```
┌─────────────────────┐
│       Header        │
├─────────────────────┤
│                     │
│     Hero Section    │
│                     │
├─────────────────────┤
│                     │
│                     │
│   Main Content      │
│                     │
│                     │
├─────────────────────┤
│       Footer        │
└─────────────────────┘
```

## 🔧 インタラクション設計

### 検索機能
- **リアルタイム検索**: 入力中にサジェスト表示
- **検索履歴**: ローカルストレージに保存
- **高度な検索**: フィルター条件の組み合わせ

### ソート・フィルター
- **URL同期**: フィルター状態をURLパラメータで管理
- **保存**: ユーザー設定をローカルストレージ
- **リセット**: ワンクリックでフィルタークリア

### 無限スクロール
- **閾値**: ページ下部から200px手前
- **バッチサイズ**: 20記事ずつ読み込み
- **ローディング**: スケルトン表示

## 🎨 アイコンシステム

### アイコンライブラリ
- **Lucide React**: 統一されたアイコンセット
- **サイズ**: 16px, 20px, 24px, 32px
- **スタイル**: アウトライン、統一された線幅

### 使用例
- **カテゴリ**: 各カテゴリ専用アイコン
- **企業**: 企業ロゴ (16x16, 32x32)
- **アクション**: 検索、フィルター、シェア、テーマ切り替え

## 📱 PWA対応

### 基本機能
- **Service Worker**: オフライン対応
- **App Manifest**: ホーム画面追加
- **Push通知**: 重要ニュースの通知

### アイコン仕様
- **192x192**: Android用
- **512x512**: 高解像度用
- **Apple Touch Icon**: iOS用

---

**更新日**: 2025年6月21日  
**バージョン**: 1.0
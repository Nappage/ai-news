# 🚀 AIニュースサイト デプロイ手順

## 前提条件
- GitHubアカウント: `august.sunny.08@gmail.com` でログイン済み
- ローカルプロジェクトの準備完了

## 1. GitHubでリポジトリ作成

### オプション A: ブラウザから作成
1. https://github.com にアクセス
2. 右上の「+」→「New repository」
3. 以下の設定で作成：
   - **Repository name**: `ai-news`
   - **Description**: `AI News - 生成AI・LLM最新ニュース サイト`
   - **Public** を選択
   - **Initialize this repository with a README** はチェック「しない」
4. 「Create repository」をクリック

### オプション B: GitHub CLI（推奨）
```bash
# GitHub CLIでリポジトリ作成
gh repo create ai-news --public --description "AI News - 生成AI・LLM最新ニュース サイト"
```

## 2. リモートリポジトリ接続とプッシュ

```bash
# リモートリポジトリを追加
git remote add origin https://github.com/[YOUR_USERNAME]/ai-news.git

# または SSH を使用（推奨）
git remote add origin git@github.com:[YOUR_USERNAME]/ai-news.git

# メインブランチをプッシュ
git push -u origin main
```

## 3. GitHub Pages 設定

### 自動設定（推奨）
リポジトリ作成後、GitHub Actionsワークフローが自動でGitHub Pagesを設定します。

### 手動設定
1. GitHubリポジトリページで「Settings」タブ
2. 左サイドバー「Pages」
3. **Source**: "GitHub Actions" を選択
4. 保存

## 4. 確認とテスト

### デプロイ状況確認
1. リポジトリの「Actions」タブでワークフロー実行状況確認
2. 「Deploy to GitHub Pages」ワークフローの成功を確認

### サイトアクセス
デプロイ完了後、以下のURLでサイトにアクセス可能：
```
https://[YOUR_USERNAME].github.io/ai-news
```

## 5. 今後の運用

### 自動更新
- **ニュース取得**: 毎日4回自動実行（JST 9:00, 15:00, 21:00, 3:00）
- **サイト更新**: コードをmainブランチにプッシュで自動デプロイ

### 手動更新
```bash
# ニュース手動取得
npm run fetch-news

# 変更をプッシュ
git add .
git commit -m "Update news data"
git push origin main
```

## 6. トラブルシューティング

### ビルドエラー
```bash
# ローカルでビルドテスト
npm run build

# エラーがある場合は修正してからプッシュ
```

### GitHub Pages 404エラー
1. リポジトリ設定でPagesが有効になっているか確認
2. GitHub Actionsワークフローが成功しているか確認
3. しばらく待ってからアクセス（反映に時間がかかる場合がある）

---

**準備完了！** あとはGitHubリポジトリを作成してプッシュするだけです。
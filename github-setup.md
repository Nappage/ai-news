# GitHub セットアップ手順

## 1. GitHubでリポジトリ作成
1. https://github.com にアクセス
2. 右上の「+」→「New repository」
3. Repository name: `ai-news`
4. Description: `AI News - 生成AI・LLM最新ニュース`
5. Public を選択
6. 「Create repository」をクリック

## 2. リモートリポジトリ接続
```bash
# リモートリポジトリを追加（ユーザー名を置き換えてください）
git remote add origin https://github.com/[YOUR_USERNAME]/ai-news.git

# メインブランチをプッシュ
git push -u origin main
```

## 3. GitHub Pages 設定
1. リポジトリの「Settings」タブをクリック
2. 左サイドバーの「Pages」をクリック
3. Source: 「GitHub Actions」を選択
4. 設定を保存

## 4. 確認
- プッシュ後、GitHub Actionsが自動実行されます
- 「Actions」タブで実行状況を確認できます
- デプロイ完了後、サイトは以下のURLで公開されます：
  `https://[YOUR_USERNAME].github.io/ai-news`

## 5. 今後の更新
- コードを変更してmainブランチにプッシュすると自動でサイトが更新されます
- ニュースは毎日自動取得されます（UTC 0:00, 6:00, 12:00, 18:00）
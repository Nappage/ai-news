# 開発環境構築ガイド

## 🖥️ 対応OS

- **macOS** (推奨: macOS 12.0+)
- **Windows** (Windows 10/11)
- **Linux** (Ubuntu 20.04+)

## 📋 必要な環境

### 共通要件
- **Node.js**: 18.0.0 以上
- **npm**: 9.0.0 以上 (または yarn, pnpm)
- **Git**: 2.0.0 以上

### 推奨エディタ
- **Visual Studio Code** (推奨)
- **WebStorm**
- **その他**: Vim, Emacs, Sublime Text

## 🍎 macOS セットアップ

### 1. Homebrew インストール
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Node.js インストール
```bash
# Homebrew経由
brew install node

# または nodenv を使用（推奨）
brew install nodenv
echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(nodenv init -)"' >> ~/.zshrc
source ~/.zshrc
nodenv install 18.19.0
nodenv global 18.19.0
```

### 3. Git設定
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 4. プロジェクトクローン・セットアップ
```bash
git clone https://github.com/[username]/ai-news.git
cd ai-news
npm install
```

## 🪟 Windows セットアップ

### 1. Node.js インストール
1. [Node.js公式サイト](https://nodejs.org/)から LTS版をダウンロード
2. インストーラーを実行
3. PowerShellで確認: `node --version && npm --version`

### 2. Git インストール
1. [Git for Windows](https://git-scm.com/download/win)をダウンロード
2. インストーラーを実行（デフォルト設定でOK）

### 3. WSL2 セットアップ（推奨）
```powershell
# 管理者権限のPowerShellで実行
wsl --install
```

### 4. プロジェクトセットアップ
```bash
# WSL2内で実行
git clone https://github.com/[username]/ai-news.git
cd ai-news
npm install
```

## 🐧 Linux (Ubuntu) セットアップ

### 1. Node.js インストール
```bash
# NodeSource経由（推奨）
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# または snap経由
sudo snap install node --classic
```

### 2. 開発ツール
```bash
sudo apt update
sudo apt install git curl build-essential
```

### 3. プロジェクトセットアップ
```bash
git clone https://github.com/[username]/ai-news.git
cd ai-news
npm install
```

## 🔧 エディタ設定

### Visual Studio Code 推奨拡張機能

#### 必須拡張機能
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss"
  ]
}
```

#### 設定ファイル (.vscode/settings.json)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 📦 パッケージ管理

### npm使用時の注意点

#### macOS
```bash
# 権限エラーが発生した場合
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
```

#### Windows
```powershell
# 管理者権限で実行
npm cache clean --force
```

### 代替パッケージマネージャー

#### Yarn
```bash
npm install -g yarn
yarn install
yarn dev
```

#### pnpm
```bash
npm install -g pnpm
pnpm install
pnpm dev
```

## 🚀 開発サーバー起動

### 基本コマンド
```bash
# 開発サーバー起動
npm run dev

# ブラウザで確認
open http://localhost:3000  # macOS
start http://localhost:3000 # Windows
```

### 便利なコマンド
```bash
# リント実行
npm run lint

# ビルド
npm run build

# プロダクション起動
npm run start

# ニュース取得テスト
npm run fetch-news
```

## 🌐 ブラウザ確認

### 推奨ブラウザ
- **Chrome** (最新版)
- **Firefox** (最新版)
- **Safari** (macOS)
- **Edge** (Windows)

### 開発者ツール
- React Developer Tools
- Redux DevTools (将来使用時)

## 🔍 トラブルシューティング

### よくある問題

#### 1. Node.jsバージョン違い
```bash
# 現在のバージョン確認
node --version

# .nvmrc がある場合
nvm use
```

#### 2. 権限エラー (macOS)
```bash
# npm権限修正
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### 3. ポート競合
```bash
# 別ポートで起動
npm run dev -- --port 3001
```

#### 4. キャッシュ問題
```bash
# npm キャッシュクリア
npm cache clean --force

# node_modules 再インストール
rm -rf node_modules package-lock.json
npm install
```

#### 5. Windows特有の問題
```powershell
# 実行ポリシー変更
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 改行コード問題
git config --global core.autocrlf true
```

## 🔄 Git ワークフロー

### 基本的な開発フロー
```bash
# 最新コードを取得
git pull origin main

# 機能ブランチ作成
git checkout -b feature/new-feature

# 変更をコミット
git add .
git commit -m "Add new feature"

# リモートにプッシュ
git push origin feature/new-feature

# GitHub でプルリクエスト作成
```

### コミットメッセージ規約
```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル修正
refactor: リファクタリング
test: テスト追加・修正
chore: その他の変更
```

## 📱 デバイステスト

### レスポンシブテスト
```bash
# Chrome DevTools
# F12 → デバイスモード

# 実機テスト用
# iPhone: Safari
# Android: Chrome
```

### パフォーマンステスト
```bash
# Lighthouse 実行
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

## 🔐 環境変数設定

### .env.local作成
```bash
# プロジェクトルートに作成
touch .env.local
```

### 設定例
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEWS_API_KEY=your_api_key_here
```

---

**更新日**: 2025年6月21日  
**対象環境**: macOS 14+, Windows 11, Ubuntu 22.04+
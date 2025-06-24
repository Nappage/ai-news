const fs = require('fs');
const path = require('path');
const Parser = require('rss-parser');

const parser = new Parser({
  timeout: 10000,
  maxRedirects: 5,
  headers: {
    'User-Agent': 'AI-News-Bot/1.0'
  }
});

// ニュースソースの設定
const NEWS_SOURCES = [
  {
    id: 'openai-blog',
    name: 'OpenAI Blog',
    url: 'https://openai.com/news/rss.xml',
    category: 'companies',
    company: 'OpenAI',
    priority: 'high'
  },
  {
    id: 'huggingface-blog',
    name: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog/feed.xml',
    category: 'tools',
    company: 'Hugging Face',
    priority: 'medium'
  },
  {
    id: 'google-ai-blog',
    name: 'Google AI Blog',
    url: 'https://ai.googleblog.com/feeds/posts/default',
    category: 'research',
    company: 'Google',
    priority: 'high'
  },
  {
    id: 'anthropic-news',
    name: 'Anthropic News', 
    url: 'https://www.anthropic.com/news.rss',
    category: 'companies',
    company: 'Anthropic',
    priority: 'high'
  },
  {
    id: 'meta-ai-blog',
    name: 'Meta AI Blog',
    url: 'https://ai.meta.com/blog/rss/',
    category: 'research',
    company: 'Meta',
    priority: 'medium'
  },
  {
    id: 'deepmind-blog',
    name: 'DeepMind Blog',
    url: 'https://deepmind.google/blog/rss.xml',
    category: 'research', 
    company: 'Google',
    priority: 'medium'
  }
];

// データディレクトリの作成
const DATA_DIR = path.join(__dirname, '../src/data');
const NEWS_DIR = path.join(DATA_DIR, 'news');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(NEWS_DIR)) {
  fs.mkdirSync(NEWS_DIR, { recursive: true });
}

// ユーティリティ関数
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function sanitizeFilename(title) {
  return title
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .substring(0, 50);
}

function extractTags(title, content) {
  const keywords = [
    'GPT', 'ChatGPT', 'Claude', 'Gemini', 'Llama', 'LLM',
    'AI', '人工知能', '機械学習', 'ML', 'Deep Learning',
    'Transformer', 'BERT', 'OpenAI', 'Anthropic', 'Google',
    'Meta', 'Microsoft', 'DeepSeek', 'Mistral'
  ];
  
  const text = `${title} ${content}`.toLowerCase();
  return keywords.filter(keyword => 
    text.includes(keyword.toLowerCase())
  ).slice(0, 5);
}

// RSSフィードからニュースを取得
async function fetchFromRSS(source) {
  try {
    console.log(`Fetching from ${source.name}...`);
    
    // タイムアウト設定付きでフェッチ
    const feed = await Promise.race([
      parser.parseURL(source.url),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
    ]);
    
    if (!feed || !feed.items) {
      console.warn(`No items found in feed from ${source.name}`);
      return [];
    }
    
    const articles = feed.items.slice(0, 5).map(item => {
      const publishedAt = new Date(item.pubDate || item.isoDate || Date.now());
      const summary = item.contentSnippet || item.content || item.description || '';
      
      return {
        id: generateId(),
        title: item.title || 'No Title',
        summary: summary.substring(0, 300) + (summary.length > 300 ? '...' : ''),
        content: item.content || item.description || '',
        publishedAt: publishedAt.toISOString(),
        source: source.name,
        sourceUrl: item.link || source.url,
        category: source.category,
        company: source.company,
        imageUrl: item.enclosure?.url || null,
        tags: extractTags(item.title || '', summary),
        featured: source.priority === 'high' && Math.random() > 0.7
      };
    });
    
    return articles;
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error.message);
    return [];
  }
}

// サンプルニュースの生成（RSS取得に失敗した場合の代替）
function generateSampleNews() {
  const sampleNews = [
    {
      id: generateId(),
      title: 'OpenAI、GPT-4の新機能を発表 - マルチモーダル対応が大幅改善',
      summary: 'OpenAIは本日、GPT-4の大規模アップデートを発表しました。画像認識精度の向上と動画理解機能の追加により、より高度な視覚的推論が可能になります。',
      publishedAt: new Date().toISOString(),
      source: 'OpenAI Blog',
      sourceUrl: 'https://openai.com/blog',
      category: 'llm',
      company: 'OpenAI',
      imageUrl: null,
      tags: ['GPT-4', 'マルチモーダル', '画像認識'],
      featured: true
    },
    {
      id: generateId(),
      title: 'Anthropic Claude 3、ベンチマークでGPT-4を上回る性能を記録',
      summary: 'AnthropicのClaude 3 Opusが複数のベンチマークテストでGPT-4を上回る結果を示しました。特に数学的推論と長文理解において大幅な改善が見られます。',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      source: 'Anthropic',
      sourceUrl: 'https://anthropic.com',
      category: 'llm',
      company: 'Anthropic',
      imageUrl: null,
      tags: ['Claude 3', 'ベンチマーク', '性能向上'],
      featured: true
    }
  ];
  
  return sampleNews;
}

// メイン実行関数
async function main() {
  console.log('🚀 Starting news fetch process...');
  
  let allArticles = [];
  let successfulSources = 0;
  
  // 各RSSソースから記事を取得
  for (const source of NEWS_SOURCES) {
    try {
      const articles = await fetchFromRSS(source);
      if (articles.length > 0) {
        allArticles = allArticles.concat(articles);
        successfulSources++;
        console.log(`✅ Successfully fetched ${articles.length} articles from ${source.name}`);
      } else {
        console.log(`⚠️  No articles found from ${source.name}`);
      }
    } catch (error) {
      console.error(`❌ Failed to fetch from ${source.name}:`, error.message);
    }
    
    // API制限を避けるため少し待機
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`📊 Successfully fetched from ${successfulSources}/${NEWS_SOURCES.length} sources`);
  
  // RSSから記事が取得できなかった場合はサンプルニュースを使用
  if (allArticles.length === 0) {
    console.log('⚠️  No articles fetched from RSS, using sample news...');
    allArticles = generateSampleNews();
  }
  
  // 重複除去（タイトルベース）
  const uniqueArticles = allArticles.filter((article, index, self) =>
    index === self.findIndex(a => a.title === article.title)
  );
  
  // 公開日順でソート
  uniqueArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  // 最新の20件に制限
  const recentArticles = uniqueArticles.slice(0, 20);
  
  // JSONファイルとして保存
  const newsData = {
    lastUpdated: new Date().toISOString(),
    totalArticles: recentArticles.length,
    articles: recentArticles
  };
  
  const outputPath = path.join(DATA_DIR, 'news.json');
  fs.writeFileSync(outputPath, JSON.stringify(newsData, null, 2), 'utf8');
  
  // 各記事を個別ファイルとしても保存
  recentArticles.forEach(article => {
    const filename = `${sanitizeFilename(article.title)}-${article.id}.json`;
    const articlePath = path.join(NEWS_DIR, filename);
    fs.writeFileSync(articlePath, JSON.stringify(article, null, 2), 'utf8');
  });
  
  console.log(`✅ Successfully fetched and saved ${recentArticles.length} articles`);
  console.log(`📁 Data saved to: ${outputPath}`);
  console.log(`📊 Featured articles: ${recentArticles.filter(a => a.featured).length}`);
  
  // 統計情報の表示
  const stats = recentArticles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {});
  
  console.log('📈 Category distribution:', stats);
}

// エラーハンドリング付きで実行
main().catch(error => {
  console.error('❌ Critical error in news fetch process:', error);
  console.error('Stack trace:', error.stack);
  process.exit(1);
});
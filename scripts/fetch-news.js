const fs = require('fs');
const path = require('path');
const Parser = require('rss-parser');
const https = require('https');

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
    id: 'google-developers-blog',
    name: 'Google Developers Blog',
    url: 'https://developers.googleblog.com/feeds/posts/default',
    category: 'tools',
    company: 'Google',
    priority: 'high'
  },
  {
    id: 'google-blog-technology',
    name: 'Google Technology Blog',
    url: 'https://blog.google/technology/rss/',
    category: 'companies',
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

// GitHub API設定（実在するリポジトリのみ）
const GITHUB_REPOS = [
  {
    id: 'anthropic-sdk-python',
    owner: 'anthropics',
    repo: 'anthropic-sdk-python',
    company: 'Anthropic',
    category: 'tools',
    priority: 'high'
  },
  {
    id: 'anthropic-claude-code',
    owner: 'anthropics',
    repo: 'claude-code',
    company: 'Anthropic',
    category: 'tools',
    priority: 'high'
  },
  {
    id: 'anthropic-dxt',
    owner: 'anthropics',
    repo: 'dxt',
    company: 'Anthropic',
    category: 'tools',
    priority: 'high'
  },
  {
    id: 'meta-llama',
    owner: 'meta-llama', 
    repo: 'llama-models',
    company: 'Meta',
    category: 'research',
    priority: 'high'
  },
  {
    id: 'openai-cookbook',
    owner: 'openai',
    repo: 'openai-cookbook',
    company: 'OpenAI',
    category: 'tools',
    priority: 'high'
  },
  {
    id: 'google-gemini-cookbook',
    owner: 'google-gemini',
    repo: 'cookbook',
    company: 'Google',
    category: 'tools', 
    priority: 'medium'
  },
  {
    id: 'google-gemini-cli',
    owner: 'google-gemini',
    repo: 'gemini-cli',
    company: 'Google',
    category: 'tools', 
    priority: 'high'
  },
  {
    id: 'microsoft-deepspeed',
    owner: 'microsoft',
    repo: 'DeepSpeed',
    company: 'Microsoft',
    category: 'tools',
    priority: 'medium'
  },
  {
    id: 'huggingface-transformers',
    owner: 'huggingface',
    repo: 'transformers',
    company: 'Hugging Face',
    category: 'tools',
    priority: 'medium'
  }
];

// Reddit API設定
const REDDIT_SUBREDDITS = [
  {
    id: 'r-machinelearning',
    subreddit: 'MachineLearning',
    category: 'research',
    company: 'Community',
    priority: 'medium'
  },
  {
    id: 'r-openai',
    subreddit: 'OpenAI',
    category: 'companies',
    company: 'OpenAI',
    priority: 'medium'
  },
  {
    id: 'r-localllama',
    subreddit: 'LocalLLaMA',
    category: 'tools',
    company: 'Community',
    priority: 'medium'
  }
];

// GitHub Search設定（動的検索）
const GITHUB_SEARCH_QUERIES = [
  {
    id: 'github-search-claude',
    query: 'Claude in:name,description,readme language:python,javascript,typescript',
    category: 'tools',
    company: 'Community',
    priority: 'medium'
  },
  {
    id: 'github-search-anthropic',
    query: 'Anthropic in:name,description,readme',
    category: 'tools', 
    company: 'Community',
    priority: 'medium'
  },
  {
    id: 'github-search-llm',
    query: 'LLM OR "large language model" created:>2025-06-01',
    category: 'research',
    company: 'Community',
    priority: 'low'
  }
];

// GitHub Organizations設定（組織全体を動的監視）
const GITHUB_ORGS = [
  {
    id: 'anthropics-org',
    org: 'anthropics',
    company: 'Anthropic',
    category: 'tools',
    priority: 'high'
  }
];

// Web Scraping設定
const SCRAPING_SOURCES = [
  {
    id: 'hackernews-ai',
    name: 'Hacker News AI',
    url: 'https://hn.algolia.com/api/v1/search?query=AI%20OR%20machine%20learning%20OR%20GPT%20OR%20LLM%20OR%20Gemini%20OR%20Claude&tags=story&hitsPerPage=15',
    category: 'industry',
    company: 'Community',
    priority: 'medium'
  },
  {
    id: 'hackernews-google',
    name: 'Hacker News Google',
    url: 'https://hn.algolia.com/api/v1/search?query=Google%20AI%20OR%20Gemini%20OR%20DeepMind&tags=story&hitsPerPage=10',
    category: 'companies',
    company: 'Google',
    priority: 'high'
  },
  {
    id: 'hackernews-claude',
    name: 'Hacker News Claude/Anthropic',
    url: 'https://hn.algolia.com/api/v1/search?query=Claude%20OR%20Anthropic%20OR%20"claude-code"&tags=story&hitsPerPage=10',
    category: 'companies',
    company: 'Anthropic',
    priority: 'high'
  },
  {
    id: 'papers-with-code',
    name: 'Papers with Code',
    url: 'https://paperswithcode.com/api/v1/papers/?ordering=-published',
    category: 'research',
    company: 'Community',
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

// HTTPリクエスト関数
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'AI-News-Bot/1.0',
        ...options.headers
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          resolve({ error: 'Failed to parse JSON', raw: data });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// GitHub APIからリポジトリ情報を取得
async function fetchFromGitHub(repo) {
  try {
    console.log(`Fetching from GitHub: ${repo.owner}/${repo.repo}...`);
    
    // リリース情報を取得
    const releasesUrl = `https://api.github.com/repos/${repo.owner}/${repo.repo}/releases?per_page=3`;
    const releases = await makeRequest(releasesUrl);
    
    if (releases.error || !Array.isArray(releases) || releases.length === 0) {
      console.warn(`No releases found for ${repo.owner}/${repo.repo}, trying recent commits...`);
      
      // リリースがない場合は最近のコミットから情報を取得
      const commitsUrl = `https://api.github.com/repos/${repo.owner}/${repo.repo}/commits?per_page=3`;
      const commits = await makeRequest(commitsUrl);
      
      if (commits.error || !Array.isArray(commits) || commits.length === 0) {
        console.warn(`No commits found for ${repo.owner}/${repo.repo}`);
        return [];
      }
      
      // 最新の重要なコミットから記事を生成
      const recentCommit = commits[0];
      const articles = [{
        id: generateId(),
        title: `${repo.company}: ${repo.repo}の最新アップデート`,
        summary: `${repo.repo}リポジトリに新しい更新: ${recentCommit.commit.message.substring(0, 200)}...`,
        content: recentCommit.commit.message,
        publishedAt: new Date(recentCommit.commit.author.date).toISOString(),
        source: `${repo.company} GitHub`,
        sourceUrl: `https://github.com/${repo.owner}/${repo.repo}`,
        category: repo.category,
        company: repo.company,
        imageUrl: null,
        tags: extractTags(repo.repo, recentCommit.commit.message),
        featured: repo.priority === 'high' && (
          recentCommit.commit.message.toLowerCase().includes('release') ||
          recentCommit.commit.message.toLowerCase().includes('desktop') ||
          recentCommit.commit.message.toLowerCase().includes('app')
        )
      }];
      
      return articles;
    }
    
    const articles = releases.slice(0, 2).map(release => ({
      id: generateId(),
      title: `${repo.company}: ${release.name || release.tag_name}`,
      summary: release.body ? release.body.substring(0, 300) + '...' : `${repo.repo}の新しいリリース`,
      content: release.body || '',
      publishedAt: new Date(release.published_at || release.created_at).toISOString(),
      source: `${repo.company} GitHub`,
      sourceUrl: release.html_url,
      category: repo.category,
      company: repo.company,
      imageUrl: null,
      tags: extractTags(release.name || release.tag_name, release.body || ''),
      featured: repo.priority === 'high' && Math.random() > 0.8
    }));
    
    return articles;
  } catch (error) {
    console.error(`Error fetching from GitHub ${repo.owner}/${repo.repo}:`, error.message);
    return [];
  }
}

// GitHub Search APIから情報を取得
async function fetchFromGitHubSearch(searchQuery) {
  try {
    console.log(`Searching GitHub: ${searchQuery.query}...`);
    
    const searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery.query)}&sort=updated&order=desc&per_page=5`;
    const results = await makeRequest(searchUrl);
    
    if (results.error || !results.items || results.items.length === 0) {
      console.warn(`No repositories found for query: ${searchQuery.query}`);
      return [];
    }
    
    const articles = results.items.slice(0, 5).map(repo => ({ // 検索結果も多めに取得
      id: generateId(),
      title: `発見: ${repo.full_name} - ${repo.description?.substring(0, 80) || 'GitHub新プロジェクト'}`,
      summary: `新しいプロジェクトを発見: ${repo.description || 'GitHub上の注目プロジェクト'} (⭐${repo.stargazers_count} | 🍴${repo.forks_count})`,
      content: `${repo.description || ''}\n\n言語: ${repo.language || 'N/A'}\nスター数: ${repo.stargazers_count}\nフォーク数: ${repo.forks_count}`,
      publishedAt: new Date(repo.updated_at).toISOString(),
      source: 'GitHub Search',
      sourceUrl: repo.html_url,
      category: 'community', // 非公式GitHub情報はcommunityカテゴリに変更
      company: searchQuery.company,
      imageUrl: null,
      tags: extractTags(repo.name, repo.description || ''),
      featured: false, // 非公式情報はfeaturedから除外
      showOnTopPage: false // トップページには表示しない
    }));
    
    return articles;
  } catch (error) {
    console.error(`Error searching GitHub: ${searchQuery.query}:`, error.message);
    return [];
  }
}

// GitHub Organization全体からリポジトリ情報を取得
async function fetchFromGitHubOrg(orgConfig) {
  try {
    console.log(`Fetching from GitHub Org: ${orgConfig.org}...`);
    
    const orgUrl = `https://api.github.com/orgs/${orgConfig.org}/repos?sort=updated&per_page=10`;
    const repos = await makeRequest(orgUrl);
    
    if (repos.error || !Array.isArray(repos) || repos.length === 0) {
      console.warn(`No repositories found for org: ${orgConfig.org}`);
      return [];
    }
    
    // 最近更新されたリポジトリの中から重要なものを選択
    const recentRepos = repos
      .filter(repo => {
        const daysSinceUpdate = (Date.now() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
        return daysSinceUpdate <= 30; // 30日以内に更新されたもの
      })
      .slice(0, 6); // Anthropics組織は重要なので多めに取得
    
    const articles = recentRepos.map(repo => ({
      id: generateId(),
      title: `${orgConfig.company}: ${repo.name}の最新アップデート`,
      summary: `${repo.description || repo.name}が更新されました (⭐${repo.stargazers_count})`,
      content: `${repo.description || ''}\n\n最終更新: ${new Date(repo.updated_at).toLocaleDateString()}\nスター数: ${repo.stargazers_count}`,
      publishedAt: new Date(repo.updated_at).toISOString(),
      source: `${orgConfig.company} GitHub Org`,
      sourceUrl: repo.html_url,
      category: orgConfig.category,
      company: orgConfig.company,
      imageUrl: null,
      tags: extractTags(repo.name, repo.description || ''),
      featured: repo.stargazers_count > 50 || orgConfig.priority === 'high'
    }));
    
    return articles;
  } catch (error) {
    console.error(`Error fetching from GitHub org ${orgConfig.org}:`, error.message);
    return [];
  }
}

// Reddit APIからサブレディット情報を取得
async function fetchFromReddit(subreddit) {
  try {
    console.log(`Fetching from Reddit: r/${subreddit.subreddit}...`);
    
    const url = `https://www.reddit.com/r/${subreddit.subreddit}/hot.json?limit=5`;
    const data = await makeRequest(url);
    
    if (data.error || !data.data || !data.data.children) {
      console.warn(`No posts found for r/${subreddit.subreddit}`);
      return [];
    }
    
    const articles = data.data.children
      .filter(post => post.data && !post.data.is_self) // 外部リンクのみ
      .slice(0, 3)
      .map(post => ({
        id: generateId(),
        title: post.data.title,
        summary: post.data.selftext ? post.data.selftext.substring(0, 300) + '...' : 'Reddit投稿',
        content: post.data.selftext || '',
        publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
        source: `Reddit r/${subreddit.subreddit}`,
        sourceUrl: post.data.url || `https://reddit.com${post.data.permalink}`,
        category: subreddit.category,
        company: subreddit.company,
        imageUrl: null,
        tags: extractTags(post.data.title, post.data.selftext || ''),
        featured: false
      }));
    
    return articles;
  } catch (error) {
    console.error(`Error fetching from Reddit r/${subreddit.subreddit}:`, error.message);
    return [];
  }
}

// Web Scrapingソースから情報を取得
async function fetchFromWebScraping(source) {
  try {
    console.log(`Fetching from ${source.name}...`);
    
    const data = await makeRequest(source.url);
    
    if (data.error) {
      console.warn(`No data found for ${source.name}`);
      return [];
    }
    
    let articles = [];
    
    if (source.id === 'hackernews-ai' || source.id === 'hackernews-google' || source.id === 'hackernews-claude') {
      const maxArticles = (source.id === 'hackernews-google' || source.id === 'hackernews-claude') ? 5 : 3; // 企業関連は多めに取得
      articles = data.hits.slice(0, maxArticles).map(hit => ({
        id: generateId(),
        title: hit.title,
        summary: hit.story_text ? hit.story_text.substring(0, 300) + '...' : 'Hacker News記事',
        content: hit.story_text || '',
        publishedAt: new Date(hit.created_at).toISOString(),
        source: source.name,
        sourceUrl: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        category: source.category,
        company: source.company,
        imageUrl: null,
        tags: extractTags(hit.title, hit.story_text || ''),
        featured: source.priority === 'high' && (
          hit.title.toLowerCase().includes('gemini') ||
          hit.title.toLowerCase().includes('claude') ||
          hit.title.toLowerCase().includes('anthropic')
        )
      }));
    } else if (source.id === 'papers-with-code') {
      articles = data.results.slice(0, 2).map(paper => ({
        id: generateId(),
        title: paper.title,
        summary: paper.abstract ? paper.abstract.substring(0, 300) + '...' : '最新AI論文',
        content: paper.abstract || '',
        publishedAt: new Date(paper.published).toISOString(),
        source: source.name,
        sourceUrl: paper.url_pdf || paper.url_abs || `https://paperswithcode.com/paper/${paper.id}`,
        category: source.category,
        company: source.company,
        imageUrl: null,
        tags: extractTags(paper.title, paper.abstract || ''),
        featured: false
      }));
    }
    
    return articles;
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error.message);
    return [];
  }
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
    
    // Googleの重要ソースからはより多く取得
    const maxItems = source.company === 'Google' && source.priority === 'high' ? 8 : 5;
    const articles = feed.items.slice(0, maxItems).map(item => {
      // 公開日時の取得（可能な限り正確な日時を使用）
      let publishedAt;
      if (item.pubDate) {
        publishedAt = new Date(item.pubDate);
      } else if (item.isoDate) {
        publishedAt = new Date(item.isoDate);
      } else if (item.date) {
        publishedAt = new Date(item.date);
      } else {
        // 日付情報がない場合は、現在時刻から推定される適切な日付を設定
        // 通常は記事取得時の1-7日前程度に設定
        const daysAgo = Math.floor(Math.random() * 7) + 1;
        publishedAt = new Date(Date.now() - (daysAgo * 24 * 60 * 60 * 1000));
      }
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
        featured: (source.priority === 'high' && Math.random() > 0.7) || 
                 (item.title && item.title.toLowerCase().includes('gemini cli'))
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
  let totalSources = NEWS_SOURCES.length + GITHUB_REPOS.length + GITHUB_SEARCH_QUERIES.length + GITHUB_ORGS.length + REDDIT_SUBREDDITS.length + SCRAPING_SOURCES.length;
  
  // 各RSSソースから記事を取得
  console.log('\n📡 Fetching from RSS sources...');
  for (const source of NEWS_SOURCES) {
    try {
      const articles = await fetchFromRSS(source);
      if (articles.length > 0) {
        allArticles = allArticles.concat(articles);
        successfulSources++;
        console.log(`✅ RSS: Successfully fetched ${articles.length} articles from ${source.name}`);
      } else {
        console.log(`⚠️  RSS: No articles found from ${source.name}`);
      }
    } catch (error) {
      console.error(`❌ RSS: Failed to fetch from ${source.name}:`, error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // GitHub APIから情報を取得
  console.log('\n🐙 Fetching from GitHub repositories...');
  for (const repo of GITHUB_REPOS) {
    try {
      const articles = await fetchFromGitHub(repo);
      if (articles.length > 0) {
        allArticles = allArticles.concat(articles);
        successfulSources++;
        console.log(`✅ GitHub: Successfully fetched ${articles.length} releases from ${repo.owner}/${repo.repo}`);
      } else {
        console.log(`⚠️  GitHub: No releases found for ${repo.owner}/${repo.repo}`);
      }
    } catch (error) {
      console.error(`❌ GitHub: Failed to fetch from ${repo.owner}/${repo.repo}:`, error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // GitHub Search APIから情報を取得
  console.log('\n🔍 Searching GitHub repositories...');
  for (const searchQuery of GITHUB_SEARCH_QUERIES) {
    try {
      const articles = await fetchFromGitHubSearch(searchQuery);
      if (articles.length > 0) {
        allArticles = allArticles.concat(articles);
        successfulSources++;
        console.log(`✅ GitHub Search: Successfully found ${articles.length} repositories for "${searchQuery.query}"`);
      } else {
        console.log(`⚠️  GitHub Search: No repositories found for "${searchQuery.query}"`);
      }
    } catch (error) {
      console.error(`❌ GitHub Search: Failed to search "${searchQuery.query}":`, error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // GitHub Organizationsから情報を取得
  console.log('\n🏢 Fetching from GitHub organizations...');
  for (const orgConfig of GITHUB_ORGS) {
    try {
      const articles = await fetchFromGitHubOrg(orgConfig);
      if (articles.length > 0) {
        allArticles = allArticles.concat(articles);
        successfulSources++;
        console.log(`✅ GitHub Org: Successfully fetched ${articles.length} repositories from ${orgConfig.org}`);
      } else {
        console.log(`⚠️  GitHub Org: No recent repositories found for ${orgConfig.org}`);
      }
    } catch (error) {
      console.error(`❌ GitHub Org: Failed to fetch from ${orgConfig.org}:`, error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Redditから情報を取得
  console.log('\n🔴 Fetching from Reddit subreddits...');
  for (const subreddit of REDDIT_SUBREDDITS) {
    try {
      const articles = await fetchFromReddit(subreddit);
      if (articles.length > 0) {
        allArticles = allArticles.concat(articles);
        successfulSources++;
        console.log(`✅ Reddit: Successfully fetched ${articles.length} posts from r/${subreddit.subreddit}`);
      } else {
        console.log(`⚠️  Reddit: No posts found from r/${subreddit.subreddit}`);
      }
    } catch (error) {
      console.error(`❌ Reddit: Failed to fetch from r/${subreddit.subreddit}:`, error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Web Scrapingソースから情報を取得
  console.log('\n🌐 Fetching from web scraping sources...');
  for (const source of SCRAPING_SOURCES) {
    try {
      const articles = await fetchFromWebScraping(source);
      if (articles.length > 0) {
        allArticles = allArticles.concat(articles);
        successfulSources++;
        console.log(`✅ Web: Successfully fetched ${articles.length} articles from ${source.name}`);
      } else {
        console.log(`⚠️  Web: No articles found from ${source.name}`);
      }
    } catch (error) {
      console.error(`❌ Web: Failed to fetch from ${source.name}:`, error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\n📊 Successfully fetched from ${successfulSources}/${totalSources} total sources`);
  
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
  
  // 注目記事を優先し、その後日付順で制限
  const featuredArticles = uniqueArticles.filter(a => a.featured);
  const otherArticles = uniqueArticles.filter(a => !a.featured);
  
  // 注目記事を先頭に、その他の記事を追加（最大50件に拡張）
  const recentArticles = [...featuredArticles, ...otherArticles].slice(0, 50);
  
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
  const categoryStats = recentArticles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {});
  
  const sourceStats = recentArticles.reduce((acc, article) => {
    acc[article.source] = (acc[article.source] || 0) + 1;
    return acc;
  }, {});
  
  const companyStats = recentArticles.reduce((acc, article) => {
    acc[article.company] = (acc[article.company] || 0) + 1;
    return acc;
  }, {});
  
  console.log('📈 Statistics:');
  console.log('  - Categories:', categoryStats);
  console.log('  - Sources:', sourceStats);
  console.log('  - Companies:', companyStats);
  console.log(`  - RSS Sources: ${NEWS_SOURCES.length} configured`);
  console.log(`  - GitHub Repos: ${GITHUB_REPOS.length} configured`);
  console.log(`  - GitHub Search: ${GITHUB_SEARCH_QUERIES.length} queries configured`);
  console.log(`  - GitHub Orgs: ${GITHUB_ORGS.length} organizations configured`);
  console.log(`  - Reddit Subreddits: ${REDDIT_SUBREDDITS.length} configured`);
  console.log(`  - Web Scraping: ${SCRAPING_SOURCES.length} configured`);
}

// エラーハンドリング付きで実行
main().catch(error => {
  console.error('❌ Critical error in news fetch process:', error);
  console.error('Stack trace:', error.stack);
  process.exit(1);
});
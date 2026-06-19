// assets/content-map.js
// 站点内容分区、关键词标签与搜索过滤函数

const siteConfig = {
  baseUrl: 'https://officialzh-aiyouxi.com.cn',
  siteName: '爱游戏',
  defaultLang: 'zh-CN'
};

// 内容分区数据
const contentSections = [
  {
    id: 'action-games',
    title: '动作游戏',
    keywords: ['动作', '冒险', '战斗', '爱游戏'],
    items: [
      { name: '热血格斗', type: 'game', tags: ['格斗', '竞技', '爱游戏'] },
      { name: '丛林冒险', type: 'game', tags: ['冒险', '解谜', '爱游戏'] }
    ]
  },
  {
    id: 'puzzle-games',
    title: '益智游戏',
    keywords: ['益智', '脑筋', '逻辑', '爱游戏'],
    items: [
      { name: '数字迷宫', type: 'game', tags: ['数学', '迷宫', '爱游戏'] },
      { name: '拼图大师', type: 'game', tags: ['拼图', '策略', '爱游戏'] }
    ]
  },
  {
    id: 'strategy-games',
    title: '策略游戏',
    keywords: ['策略', '模拟', '经营', '爱游戏'],
    items: [
      { name: '帝国崛起', type: 'game', tags: ['策略', '模拟', '爱游戏'] },
      { name: '农场物语', type: 'game', tags: ['经营', '养成', '爱游戏'] }
    ]
  }
];

// 搜索过滤函数
function searchContent(query) {
  if (!query || typeof query !== 'string') {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  if (lowerQuery.length === 0) {
    return [];
  }

  const results = [];

  contentSections.forEach(section => {
    const sectionMatches = section.keywords.some(kw =>
      kw.toLowerCase().includes(lowerQuery)
    );

    if (sectionMatches) {
      results.push({
        type: 'section',
        id: section.id,
        title: section.title,
        matchType: 'keyword'
      });
    }

    section.items.forEach(item => {
      const itemMatches = item.tags.some(tag =>
        tag.toLowerCase().includes(lowerQuery)
      ) || item.name.toLowerCase().includes(lowerQuery);

      if (itemMatches) {
        results.push({
          type: 'item',
          sectionId: section.id,
          itemName: item.name,
          itemType: item.type,
          matchType: 'tag_or_name'
        });
      }
    });
  });

  return results;
}

// 按分区获取所有标签
function getAllTags() {
  const tagSet = new Set();
  contentSections.forEach(section => {
    section.keywords.forEach(kw => tagSet.add(kw));
    section.items.forEach(item => {
      item.tags.forEach(tag => tagSet.add(tag));
    });
  });
  return Array.from(tagSet);
}

// 生成站点地图数据（非爬虫，仅基于已有数据）
function generateSitemapData() {
  const sitemap = [];
  contentSections.forEach(section => {
    sitemap.push({
      loc: `${siteConfig.baseUrl}/${section.id}`,
      title: section.title,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly'
    });
    section.items.forEach(item => {
      sitemap.push({
        loc: `${siteConfig.baseUrl}/${section.id}/${item.name}`,
        title: item.name,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly'
      });
    });
  });
  return sitemap;
}

// 导出（支持 Node.js 或浏览器环境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    siteConfig,
    contentSections,
    searchContent,
    getAllTags,
    generateSitemapData
  };
}
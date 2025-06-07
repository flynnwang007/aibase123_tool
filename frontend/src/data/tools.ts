import { Tool } from '@/types';

export const tools: Tool[] = [
  {
    id: 1,
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: '由OpenAI开发的大型语言模型，能够进行自然语言对话和创作。',
    logo_url: 'https://static.aitools.fyi/logos/chatgpt.png',
    website_url: 'https://chat.openai.com',
    category_id: 6, // AI对话聊天
    status: 1,
    featured: true,
    views: 10000,
    tags: [
      { id: 1, name: '对话' },
      { id: 2, name: 'GPT' },
      { id: 3, name: '写作' }
    ]
  },
  {
    id: 2,
    name: 'Midjourney',
    slug: 'midjourney',
    description: '强大的AI图像生成工具，可以创作高质量的艺术作品。',
    logo_url: 'https://static.aitools.fyi/logos/midjourney.png',
    website_url: 'https://www.midjourney.com',
    category_id: 2, // AI图像工具
    status: 1,
    featured: true,
    views: 8000,
    tags: [
      { id: 4, name: '图像生成' },
      { id: 5, name: '艺术创作' }
    ]
  },
  {
    id: 3,
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    description: '开源的AI图像生成模型，支持本地部署和自定义训练。',
    logo_url: 'https://static.aitools.fyi/logos/stable-diffusion.png',
    website_url: 'https://stability.ai',
    category_id: 2,
    status: 1,
    featured: true,
    views: 7000,
    tags: [
      { id: 4, name: '图像生成' },
      { id: 6, name: '开源' }
    ]
  },
  {
    id: 4,
    name: 'Claude',
    slug: 'claude',
    description: 'Anthropic开发的AI助手，擅长写作和分析。',
    logo_url: 'https://static.aitools.fyi/logos/claude.png',
    website_url: 'https://claude.ai',
    category_id: 6,
    status: 1,
    featured: true,
    views: 6000,
    tags: [
      { id: 1, name: '对话' },
      { id: 3, name: '写作' }
    ]
  },
  {
    id: 5,
    name: 'Notion AI',
    slug: 'notion-ai',
    description: 'Notion集成的AI助手，提供写作和内容生成功能。',
    logo_url: 'https://static.aitools.fyi/logos/notion.png',
    website_url: 'https://notion.so',
    category_id: 4, // AI办公工具
    status: 1,
    featured: true,
    views: 5000,
    tags: [
      { id: 3, name: '写作' },
      { id: 7, name: '办公' },
      { id: 8, name: '笔记' }
    ]
  },
  {
    id: 6,
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description: 'GitHub和OpenAI合作开发的AI编程助手。',
    logo_url: 'https://static.aitools.fyi/logos/github-copilot.png',
    website_url: 'https://github.com/features/copilot',
    category_id: 7, // AI编程工具
    status: 1,
    featured: true,
    views: 4500,
    tags: [
      { id: 9, name: '编程' },
      { id: 10, name: '代码生成' }
    ]
  },
  {
    id: 7,
    name: 'Jasper',
    slug: 'jasper',
    description: '专业的AI写作和内容生成平台。',
    logo_url: 'https://static.aitools.fyi/logos/jasper.png',
    website_url: 'https://jasper.ai',
    category_id: 1, // AI写作工具
    status: 1,
    featured: true,
    views: 4000,
    tags: [
      { id: 3, name: '写作' },
      { id: 11, name: '营销' }
    ]
  },
  {
    id: 8,
    name: 'Runway',
    slug: 'runway',
    description: '专业的AI视频编辑和生成工具。',
    logo_url: 'https://static.aitools.fyi/logos/runway.png',
    website_url: 'https://runway.ml',
    category_id: 3, // AI视频工具
    status: 1,
    featured: true,
    views: 3500,
    tags: [
      { id: 12, name: '视频编辑' },
      { id: 13, name: '视频生成' }
    ]
  }
]; 
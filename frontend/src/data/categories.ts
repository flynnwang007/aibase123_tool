import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 1,
    name: 'AI写作工具',
    slug: 'writing',
    icon: '✍️',
    parent_id: null,
    created_at: '2023-01-01T00:00:00Z',
    children: []
  },
  {
    id: 2,
    name: 'AI图像工具',
    slug: 'image',
    icon: '🎨',
    parent_id: null,
    created_at: '2023-01-01T00:00:00Z',
    children: [
      { 
        id: 21, 
        name: '常用AI图像工具', 
        slug: 'common-image',
        parent_id: 2,
        created_at: '2023-01-01T00:00:00Z'
      },
      { id: 22, name: 'AI图片插画生成', slug: 'illustration' },
      { id: 23, name: 'AI图片背景移除', slug: 'background-removal' },
      { id: 24, name: 'AI图片无损放大', slug: 'upscale' },
      { id: 25, name: 'AI图片优化修复', slug: 'image-enhancement' },
      { id: 26, name: 'AI图片物体抹除', slug: 'object-removal' },
      { id: 27, name: 'AI商品图生成', slug: 'product-image' },
      { id: 28, name: 'AI 3D模型生成', slug: '3d-model' }
    ]
  },
  {
    id: 3,
    name: 'AI视频工具',
    slug: 'video',
    icon: '🎬',
    children: []
  },
  {
    id: 4,
    name: 'AI办公工具',
    slug: 'office',
    icon: '💼',
    children: [
      { id: 41, name: 'AI幻灯片和演示', slug: 'presentation' },
      { id: 42, name: 'AI表格数据处理', slug: 'spreadsheet' },
      { id: 43, name: 'AI文档工具', slug: 'document' },
      { id: 44, name: 'AI思维导图', slug: 'mindmap' },
      { id: 45, name: 'AI会议工具', slug: 'meeting' },
      { id: 46, name: 'AI效率提升', slug: 'productivity' }
    ]
  },
  {
    id: 5,
    name: 'AI设计工具',
    slug: 'design',
    icon: '🎯',
    children: []
  },
  {
    id: 6,
    name: 'AI对话聊天',
    slug: 'chat',
    icon: '💭',
    children: []
  },
  {
    id: 7,
    name: 'AI编程工具',
    slug: 'coding',
    icon: '💻',
    children: []
  },
  {
    id: 8,
    name: 'AI搜索引擎',
    slug: 'search',
    icon: '🔍',
    children: []
  },
  {
    id: 9,
    name: 'AI音频工具',
    slug: 'audio',
    icon: '🎵',
    children: []
  },
  {
    id: 10,
    name: 'AI开发平台',
    slug: 'development',
    icon: '⚙️',
    children: []
  },
  {
    id: 11,
    name: 'AI训练模型',
    slug: 'model',
    icon: '🧠',
    children: []
  },
  {
    id: 12,
    name: 'AI内容检测',
    slug: 'detection',
    icon: '🔎',
    children: []
  },
  {
    id: 13,
    name: 'AI语言翻译',
    slug: 'translation',
    icon: '🌐',
    children: []
  },
  {
    id: 14,
    name: 'AI法律助手',
    slug: 'legal',
    icon: '⚖️',
    children: []
  },
  {
    id: 15,
    name: 'AI提示指令',
    slug: 'prompt',
    icon: '📝',
    children: []
  },
  {
    id: 16,
    name: 'AI模型评测',
    slug: 'evaluation',
    icon: '📊',
    children: []
  },
  {
    id: 17,
    name: 'AI学习网站',
    slug: 'learning',
    icon: '📚',
    children: []
  }
]; 
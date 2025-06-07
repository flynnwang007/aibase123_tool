import axios from 'axios';
import { Tool } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'
});

export const toolsApi = {
  getAll: async (): Promise<Tool[]> => {
    const { data } = await api.get('/tools');
    return data.map((tool: any) => ({
      ...tool,
      tags: tool.tags || []
    }));
  },

  getFeatured: async (): Promise<Tool[]> => {
    const { data } = await api.get('/tools/featured');
    return data;
  },

  getLatest: async (): Promise<Tool[]> => {
    const { data } = await api.get('/tools/latest');
    return data;
  },

  search: async (query: string): Promise<Tool[]> => {
    const { data } = await api.get(`/tools/search?q=${query}`);
    return data;
  },

  getByCategory: async (categoryId: number): Promise<Tool[]> => {
    const { data } = await api.get(`/tools/category/id/${categoryId}`);
    return data;
  },

  getByCategorySlug: async (slug: string): Promise<Tool[]> => {
    const { data } = await api.get(`/tools/category/${slug}`);
    return data;
  },

  getBySlug: async (slug: string): Promise<Tool> => {
    const { data } = await api.get(`/tools/${slug}`);
    return data;
  },

  getRelated: async (toolId: number): Promise<Tool[]> => {
    const { data } = await api.get(`/tools/${toolId}/related`);
    return data;
  },

  incrementViews: async (toolId: number): Promise<void> => {
    await api.post(`/tools/${toolId}/views`);
  }
};

export const favoriteApi = {
  getAll: async (): Promise<Tool[]> => {
    const { data } = await api.get('/favorites');
    return data;
  },

  add: async (toolId: number): Promise<void> => {
    await api.post('/favorites', { toolId });
  },

  remove: async (toolId: number): Promise<void> => {
    await api.delete(`/favorites/${toolId}`);
  },

  check: async (toolId: number): Promise<boolean> => {
    const { data } = await api.get(`/favorites/check/${toolId}`);
    return data.isFavorited;
  }
};

export const commentApi = {
  getByTool: async (toolId: number) => {
    const { data } = await api.get(`/comments/tool/${toolId}`);
    return data;
  },

  add: async (toolId: number, content: string, rating: number) => {
    const { data } = await api.post('/comments', { toolId, content, rating });
    return data;
  }
}; 
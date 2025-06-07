export interface Comment {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: string;
  replies?: Comment[];
  parentId?: number | null;
  depth?: number;
} 
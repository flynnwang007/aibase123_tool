export interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  website_url: string;
  category_id: number;
  status: number;
  featured: boolean;
  views: number;
  created_at: Date;
  updated_at: Date;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  created_at: Date;
}

export interface JwtPayload {
  userId: number;
  role: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
} 
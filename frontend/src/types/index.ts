export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  parent_id?: number | null;
  created_at?: string;
  children?: Category[];
}

export interface Tag {
  id: number;
  name: string;
  created_at?: string;
}

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
  created_at?: string;
  updated_at?: string;
  tags: Tag[];
}

export interface SubCategory extends Category {
  parent_id: number;
} 
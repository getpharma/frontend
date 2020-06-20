export interface ProductCategory {
  id: number;
  title: string;
  slug: string;
  image_url?: string;
}

export interface Product {
  id: number;
  title: string;
  manufacturer: string;
  pack_size: string;
  image_url?: string;
  description?: string;
  category_id?: number;
  mrp: string;
  off_percentage?: number;
  off_amount?: number;
  selling_price?: string;
  is_trending?: boolean;
  is_active?: boolean;
}

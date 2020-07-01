import { Wholesaler } from './wholesaler';
import { StockStatus } from '../enums/stock-status.enum';
import { Order } from './order';

export interface ProductCategory {
  id: number;
  title: string;
  is_active: boolean;
  image_url?: string;
}

export interface Product {
  id: number;
  title: string;
  manufacturer: string;
  pack_size: string;
  image_url?: string;
  composition?: string;
  category_id?: number;
  mrp: string;
  off_percentage?: number;
  off_amount?: number;
  selling_price?: string;
  is_trending?: boolean;
  is_active?: boolean;
  category: ProductCategory;
}

export interface WholesalerProduct {
  id: number;
  wholesaler_id: number;
  product_id: number;
  product_name: string;
  mrp: number;
  off_percentage: number;
  off_amount: number;
  previous_price: number;
  deal_price: number;
  composition: string;
  is_assigned: boolean;
  wholesaler: Wholesaler;
  product: Product;
}

export interface Stock {
  id: number;
  product_id: number;
  no_of_units: number;
  product: Product;
}

export interface Inventory {
  id: number;
  product_id: number;
  no_of_units: number;
  product: Product;
}

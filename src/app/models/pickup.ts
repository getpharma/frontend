import { AvailabilityEnum } from '../enums/availability.enum';
import { Product, WholesalerProduct } from './product';
import { CompactProductWholesaler } from './compact-product';
import { PickupStatus } from '../enums/order-status.enum';
import { Wholesaler } from './wholesaler';

export interface Pickup {
  id: number;
  pickup_id: number;
  wholesaler_id: number;
  products: CompactProductWholesaler[];
  amount: number;
  pickup_status: PickupStatus;
  delivery_code: string;
  employee_id: number;
  employee_name: string;
  pickup_address: string;
  pickup_date: Date;
  wholesaler: Wholesaler;
}

export interface PickupProduct {
  id: number;
  wholesaler_product_id: number;
  product_id: number;
  amount: number;
  required_quantity: number;
  available_quantity: number;
  availability: AvailabilityEnum;
  delivery_date: Date;
  wholesalerProduct?: WholesalerProduct;
  product?: Product;
}

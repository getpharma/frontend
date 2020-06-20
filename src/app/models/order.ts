import {CompactProduct} from './compact-product';
import {PaymentStatus} from '../enums/payment-status.enum';
import {OrderStatus} from '../enums/order-status.enum';

export interface Order {
  id: number;
  order_id: number;
  user_id: number;
  cart_id: number;
  products: CompactProduct[];
  amount: number;
  delivery_charge: number;
  delivery_address: string;
  latitude?: string;
  longitude?: string;
  employee_id?: number;
  delivery_code?: string;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  pending_products: CompactProduct[];
  expected_date?: Date;
}

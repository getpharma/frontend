import { CompactProduct } from './compact-product';
import { PaymentStatus } from '../enums/payment-status.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { User } from './user';
import { Employee } from './employee';

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
  packager_id?: number;
  delivery_man_id?: number;
  delivery_code?: string;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  pending_products: CompactProduct[];
  expected_date?: Date;
  user?: User;
  packager?: Employee;
  delivery_man?: Employee;
}

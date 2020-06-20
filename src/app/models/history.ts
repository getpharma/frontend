import {Employee} from './employee';
import {User} from './user';
import {OrderStatus} from '../enums/order-status.enum';
import {PaymentStatus} from '../enums/payment-status.enum';
import {CompactProduct} from './compact-product';

export interface History {
  id: number;
  order_id: number;
  user_id: number;
  products: CompactProduct[];
  amount: number;
  delivery_charge: number;
  delivery_address: string;
  employee_id?: number;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  delivery_date?: Date;
  invoice_url?: string;
  user: User;
  employee: Employee;
}

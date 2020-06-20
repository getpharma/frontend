export interface Wholesaler {
  id: number;
  name?: string;
  email?: string;
  mobile_no: string;
  alternate_no?: string;
  password: string;
  address?: string;
  landmark?: string;
  state?: string;
  pincode?: string;
  pending_amount: number;
  latitude?: string;
  longitude?: string;
  is_active: boolean;
}

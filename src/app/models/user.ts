import {DaysEnum} from '../enums/days.enum';

export interface User {
  id: number;
  name?: string;
  store_name?: string;
  email?: string;
  mobile_no: string;
  alternate_no?: string;
  delivery_day: DaysEnum;
  password: string;
  address?: string;
  landmark?: string;
  state?: string;
  pincode?: string;
  delivery_charge: number;
  latitude?: string;
  longitude?: string;
  favorites: number[];
  is_active: boolean;
}

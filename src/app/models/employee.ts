import {EmployeeCategory} from '../enums/employee-category.enum';

export interface Employee {
  id: number;
  name: string;
  email: string;
  mobile_no: string;
  password: string;
  category: EmployeeCategory;
  aadhaar_no?: string;
  driver_license?: string;
  address: string;
  pincode: string;
  created_by: number;
}

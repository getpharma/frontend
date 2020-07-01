import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { map } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
  constructor(private api: ApiService) {
  }

  createEmployee(data: any): Observable<Employee> {
    return this.api.post<any>('/employees', data).pipe(map(res => res.data));
  }

  updateEmployee(id: number, data: any): Observable<Employee> {
    return this.api.put<any>('/employee/' + id, data).pipe(map(res => res.data));
  }

  viewEmployees(): Observable<Employee[]> {
    return this.api.get<any>('/employees').pipe(map(res => res.data));
  }

  viewPackagers(): Observable<Employee[]> {
    return this.api.get<any>('/packagers').pipe(map(res => res.data));
  }

  viewDeliveryMan(): Observable<Employee[]> {
    return this.api.get<any>('/delivery-man').pipe(map(res => res.data));
  }
}

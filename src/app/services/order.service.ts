import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';
import { History } from '../models/history';
import { DaysEnum } from '../enums/days.enum';
import { OrderStatus } from '../enums/order-status.enum';

@Injectable()
export class OrderService {

  constructor(private api: ApiService) {
  }

  viewOrdersByStatus(status?: OrderStatus, day?: string): Observable<Order[]> {
    if (status && day) {
      return this.api.get<any>('/retailer-orders?status=' + status + '&day=' + day).pipe(map(res => res.data));
    }
    if (status) {
      return this.api.get<any>('/retailer-orders?status=' + status).pipe(map(res => res.data));
    }
    if (day) {
      return this.api.get<any>('/retailer-orders?day=' + day).pipe(map(res => res.data));
    }
    return this.api.get<any>('/retailer-orders').pipe(map(res => res.data));
  }

  viewHistoryByStatus(day?: string): Observable<History[]> {
    if (day) {
      return this.api.get<any>('/retailer-history?day=' + day).pipe(map(res => res.data));
    }
    return this.api.get<any>('/retailer-history').pipe(map(res => res.data));
  }

  assignEmployeesToOrder(id: number, data: any): Observable<Order> {
    return this.api.put<any>('/assign-employees/' + id, data).pipe(map(res => res.data));
  }

  cancelOrder(id: number): Observable<History> {
    console.log(id);
    return this.api.put<any>('/cancel-order/' + id);
  }
}

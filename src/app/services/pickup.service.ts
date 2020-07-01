import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Pickup, PickupProduct } from '../models/pickup';
import { map } from 'rxjs/operators';

@Injectable()
export class PickupService {
  constructor(private api: ApiService) {
  }

  viewPickupProducts(status?: string, day?: string): Observable<PickupProduct[]> {
    if (status && day) {
      return this.api.get<any>('/index-pickup-products?status=' + status + '&day=' + day).pipe(map(res => res.data));
    }
    if (status) {
      return this.api.get<any>('/index-pickup-products?status=' + status).pipe(map(res => res.data));
    }
    if (day) {
      return this.api.get<any>('/index-pickup-products?day=' + day).pipe(map(res => res.data));
    }
    return this.api.get<any>('/index-pickup-products').pipe(map(res => res.data));
  }

  viewUnassignedPP(day?: string): Observable<PickupProduct[]> {
    if (day) {
      return this.api.get<any>('/unassigned-pickups?day=' + day).pipe(map(res => res.data));
    }
    return this.api.get<any>('/unassigned-pickups').pipe(map(res => res.data));
  }

  viewAssignedPickupProducts(day?: string): Observable<PickupProduct[]> {
    if (day) {
      return this.api.get<any>('/assigned-pickup-products-admin?day=' + day).pipe(map(res => res.data));
    }
    return this.api.get<any>('/assigned-pickup-products-admin').pipe(map(res => res.data));
  }

  viewPickups(status?: string): Observable<Pickup[]> {
    if (status) {
      return this.api.get<any>('/pickups?status=' + status).pipe(map(res => res.data));
    }
    return this.api.get<any>('/pickups').pipe(map(res => res.data));
  }

  actOnModRate(id: number, action: any): Observable<any> {
    return this.api.put<any>('/act-on-revised-rate/' + id, {action});
  }

  assignPickupToWholesaler(id: number, data: any): Observable<PickupProduct> {
    return this.api.put<any>('/assign-pickup/' + id, data).pipe(map(res => res.data));
  }

  assignPickupsByDay(day: string): Observable<PickupProduct[]> {
    return this.api.post<any>('/assign-pickups', {day}).pipe(map(res => res.data));
  }

  assignAllPickupsToWhole(): Observable<PickupProduct[]> {
    return this.api.post<any>('/assign-all-pickups');
  }

  assignPackagerToPickup(pickupId: number, data: any): Observable<Pickup> {
    return this.api.put<any>('/assign-packager/' + pickupId, data).pipe(map(res => res.data));
  }
}

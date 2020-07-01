import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Wholesaler } from '../models/wholesaler';
import { map } from 'rxjs/operators';

@Injectable()
export class WholesalerService {
  constructor(private api: ApiService) {
  }

  viewWholesalers(query?: string): Observable<Wholesaler[]> {
    if (!query) {
      return this.api.get<any>('/wholesalers').pipe(map(res => res.data));
    }
    return this.api.get<any>('/wholesalers?query=' + query).pipe(map(res => res.data));
  }

  addWholesaler(data: any): Observable<Wholesaler> {
    return this.api.post<any>('/wholesalers', data).pipe(map(res => res.data));
  }

  updateWholesaler(id: number, data: any): Observable<Wholesaler> {
    return this.api.put<any>('/wholesaler/' + id, data).pipe(map(res => res.data));
  }
}

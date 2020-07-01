import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private api: ApiService) {
  }

  viewRetailers(): Observable<User[]> {
    return this.api.get<any>('/users').pipe(map(res => res.data));
  }

  createRetailer(data: any): Observable<User> {
    return this.api.post<any>('/create-user', data).pipe(map(res => res.data));
  }

  updateRetailer(id: number, data: any): Observable<User> {
    return this.api.put<any>('/user/' + id, data).pipe(map(res => res.data));
  }


}

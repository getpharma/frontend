import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminService {

  constructor(private api: ApiService) {
  }

  login(data: { emailOrPhone: string, password: string }): Observable<any> {
    return this.api.post<any>('/login-employee', data);
  }

  logout() {
    return this.api.removeToken();
  }


}

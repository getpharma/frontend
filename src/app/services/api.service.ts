import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  static getToken(): string {
    return localStorage.getItem('auth_token');
  }

  removeToken() {
    localStorage.removeItem('auth_token');
  }

  get<T>(url: string, data?: any): Observable<T> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', ApiService.getToken());
    return this.http.get<T>(this.baseUrl + url, {params: data, headers});
  }

  post<T>(url: string, data?: any): Observable<T> {
    const token = ApiService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', token);
    }
    return this.http.post<T>(this.baseUrl + url, data, {headers});
  }

  put<T>(url: string, data?: any): Observable<T> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', ApiService.getToken());
    return this.http.put<T>(this.baseUrl + url, data, {params: data, headers});
  }

  delete<T>(url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', ApiService.getToken());
    return this.http.delete<T>(this.baseUrl + url, {headers});
  }


}

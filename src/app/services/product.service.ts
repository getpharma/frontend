import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Inventory, Product, ProductCategory, Stock, WholesalerProduct } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private api: ApiService) {
  }

  viewCategories(): Observable<ProductCategory[]> {
    return this.api.get<any>('/categories-for-admin').pipe(map(res => res.data));
  }

  addCategory(data: any): Observable<ProductCategory> {
    return this.api.post<any>('/productCategories', data).pipe(map(res => res.data));
  }

  updateCategory(id: number, data: any): Observable<ProductCategory> {
    return this.api.put<any>('/productCategory/' + id, data).pipe(map(res => res.data));
  }

  viewProducts(): Observable<Product[]> {
    return this.api.get<any>('/products-for-admin').pipe(map(res => res.data));
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.api.get<any>('/products-for-admin?query=' + query).pipe(map(res => res.data));
  }

  createProduct(data: any): Observable<Product> {
    console.log(data);
    return this.api.post<any>('/products', data).pipe(map(res => res.data));
  }

  updateProduct(id: number, data: any): Observable<Product> {
    console.log(id);
    console.log(data);
    return this.api.put<any>('/product/' + id, data).pipe(map(res => res.data));
  }

  createWP(data: any): Observable<WholesalerProduct> {
    console.log(data);
    return this.api.post<any>('/wholesaler-product', data).pipe(map(res => res.data));
  }

  updateWp(id: number, data: any): Observable<WholesalerProduct> {
    console.log(data);
    return this.api.put<any>('/wholesaler-product/' + id, data).pipe(map(res => res.data));
  }

  viewAllWPs(): Observable<WholesalerProduct[]> {
    return this.api.get<any>('/assigned-wholesaler-products').pipe(map(res => res.data));
  }

  viewWpByProduct(productId: number): Observable<WholesalerProduct[]> {
    return this.api.get<any>('/wholesalers-by-product/' + productId).pipe(map(res => res.data));
  }

  delete(type: string, id: number): Observable<any> {
    return this.api.delete<any>('/' + type + '/' + id);
  }

  viewStocks(): Observable<Stock[]> {
    return this.api.get<any>('/stocks').pipe(map(res => res.data));
  }

  createStock(data: any): Observable<Stock> {
    return this.api.post<any>('/stocks', data).pipe(map(res => res.data));
  }

  updateStock(id: number, data: any): Observable<Stock[]> {
    return this.api.put<any>('/stock/' + id, data).pipe(map(res => res.data));
  }

  viewInventory(): Observable<Inventory[]> {
    return this.api.get<any>('/inventory').pipe(map(res => res.data));
  }

}

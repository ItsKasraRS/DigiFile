import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getLatestProducts(): Observable<any> {
    return this.http.get('product/get-latest-products');
  }

  getPopularProducts(): Observable<any> {
    return this.http.get('product/get-popular-products');
  }
}

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

  filterProducts(title: string, sortBy: string, categoryId: number, pageId: number): Observable<any> {
    return this.http.get('product/filter-products?title='+title+'&sortBy='+(sortBy && sortBy !== 'sortBy' ? sortBy : '')+'&categories='+categoryId+'&pageId='+pageId);
  }

  getProductDetails(id: number): Observable<any> {
    return this.http.get('product/details/'+id);
  }

  getProductGallery(id: number): Observable<any> {
    return this.http.get('product/get-gallery/'+id);
  }
}

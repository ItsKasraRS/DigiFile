import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
count = 0;
cartCount$ = new BehaviorSubject<any>(0);;

constructor(private http: HttpClient) { }
  showCart(): Observable<any> {
    return this.http.get('order/user-cart');
  }
  addToCart(productId: number): Observable<any> {
    return this.http.get('order/add-order/'+productId);
  }
  removeItemFromCart(id: number): Observable<any> {
    return this.http.get<any>('order/remove-item/'+ id);
  }
  isExistProductInOrder(productId: number): Observable<any> {
    return this.http.get<any>('order/check-order/'+productId);
  }
  getCount(){
    return this.http.get<any>('order/get-cart-count');
  }
  setCount(value) {
    this.cartCount$.next(value);
  }
  getObservableCount(): Observable<any> {
    return this.cartCount$;
  }
}
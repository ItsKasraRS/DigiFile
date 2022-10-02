import { LoginDTO } from './../../DTOs/Account/loginDTO';
import { RegisterDTO } from './../../DTOs/Account/registerDTO';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  register(model: RegisterDTO): Observable<any> {
    return this.http.post('account/register', model);
  }
  activateAccount(code: string): Observable<any> {
    return this.http.get('account/activate-account/' + code);
  }
  login(model: LoginDTO): Observable<any> {
    return this.http.post('account/login', model);
  }
  checkAuth(): Observable<any> {
    return this.http.post('account/check-auth', null);
  }
  getUserById(id: number) {
    return this.http.get('account/getUserById/'+id);
  }
  Authenticated(): Observable<boolean> {
    return this.isAuthenticated;
  }
  setAuth(val: boolean) {
    this.isAuthenticated.next(val);
  }
  getSidebarInfo(userId: number): Observable<any> {
    return this.http.get('account/get-sidebar-info/'+userId);
  }
}

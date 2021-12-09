import { LoginDTO } from './../../DTOs/Account/loginDTO';
import { RegisterDTO } from './../../DTOs/Account/registerDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
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
}

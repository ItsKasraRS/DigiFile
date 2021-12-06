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
}

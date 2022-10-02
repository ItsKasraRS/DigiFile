import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  constructor(private accountService: AccountService, private route: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(obs => {
      this.accountService.checkAuth().subscribe(
          res => {
              if (res.status === 'Success') {
                  obs.next(true);
              }
              else {
                  this.route.navigate(['/']);
                  obs.next(false);
              }
          }
      );
  });;
  }
  
}

import { LoginComponent } from './../../Pages/login/login.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from 'src/app/services/category/category.service';
import { SimpleDomainName } from 'src/app/Utilities/ApiPath';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  isAuthenticated = false;
  categories;
  userInfo: any;
  userImage = SimpleDomainName + 'user/';
  token = localStorage.getItem('token');
  searchTitle = '';
  totalItem;
  constructor(private dialog: MatDialog, private api: AccountService, private cdr: ChangeDetectorRef, private categoryService: CategoryService, private router: Router, private orderService: OrderService) 
  { 
  }

  ngOnInit(): void {
    this.isLoggedIn();
    this.categoryService.getCategories().subscribe(res=> {
      this.categories = res.data;
    })

    const decodedToken = helper.decodeToken(this.token);
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    this.api.getSidebarInfo(parseInt(userId)).subscribe(res=> {
      if(res.status === 'Success') {
        this.userInfo = res.data;
      }
    });

    this.orderService.getCount().subscribe(res => {
      this.orderService.setCount(res['data']);
      this.orderService.getObservableCount().subscribe(count => {
        this.totalItem = count;
      }
      );
    });
  }
  isLoggedIn() {
    this.api.checkAuth().subscribe(res=> {
      if(res.status === "Success") {
        this.api.setAuth(true);
      }
      else {
        this.api.setAuth(false);
      }
    })
    this.api.Authenticated().subscribe(res=> {
      this.isAuthenticated = res;      
    });
  }

  LoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }

  searchProduct() {
    this.router.navigateByUrl('/register', {skipLocationChange: true }).then(() => {
      this.router.navigate(['/products'], {queryParams: { q: this.searchTitle ? this.searchTitle : ''}})
    }); 
    // this.router.navigate(['/products'], {queryParams: { q: this.searchTitle}})
  }

  navigateCategory(id: number) {
    this.router.navigateByUrl('/redirect', {skipLocationChange: true }).then(() => {
      this.router.navigate(['/products'], {queryParams: { categories: id != null || undefined ? id : null}})
    });
  }
}

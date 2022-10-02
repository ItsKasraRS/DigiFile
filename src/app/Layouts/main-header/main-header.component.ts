import { LoginComponent } from './../../Pages/login/login.component';
import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from 'src/app/services/category/category.service';
import { SimpleDomainName } from 'src/app/Utilities/ApiPath';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  constructor(private dialog: MatDialog, private api: AccountService, private cdr: ChangeDetectorRef, private categoryService: CategoryService) 
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
}

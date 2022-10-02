import { LoginComponent } from './../../Pages/login/login.component';
import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  isAuthenticated = false;
  categories;
  constructor(private dialog: MatDialog, private api: AccountService, private cdr: ChangeDetectorRef, private categoryService: CategoryService) 
  { 
  }

  ngOnInit(): void {
    this.isLoggedIn();
    this.categoryService.getCategories().subscribe(res=> {
      this.categories = res.data;
    })
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

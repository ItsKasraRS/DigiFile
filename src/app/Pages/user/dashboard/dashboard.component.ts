import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'src/app/services/account/account.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token = localStorage.getItem('token');
  userInfo: any;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    const decodedToken = helper.decodeToken(this.token);
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    this.accountService.getDashboardInfo(parseInt(userId)).subscribe(res=> {
      this.userInfo = res.data;
    })
  }

}

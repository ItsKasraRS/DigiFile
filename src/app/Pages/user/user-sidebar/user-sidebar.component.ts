import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'src/app/services/account/account.service';


const helper = new JwtHelperService();

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  token = localStorage.getItem('token');
  userInfo: any;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    const decodedToken = helper.decodeToken(this.token);
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    this.accountService.getSidebarInfo(parseInt(userId)).subscribe(res=> {
      if(res.status === 'Success') {
        this.userInfo = res.data;
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account/account.service';
import { SimpleDomainName } from 'src/app/Utilities/ApiPath';


const helper = new JwtHelperService();

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  token = localStorage.getItem('token');
  userInfo: any;
  userImage = SimpleDomainName + 'user/';
  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    const decodedToken = helper.decodeToken(this.token);
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    this.accountService.getSidebarInfo(parseInt(userId)).subscribe(res=> {
      if(res.status === 'Success') {
        this.userInfo = res.data;
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.accountService.isAuthenticated.next(false);
    this.router.navigate(['/']);
    this.toastr.warning('You successfully logged out!')
  }
}

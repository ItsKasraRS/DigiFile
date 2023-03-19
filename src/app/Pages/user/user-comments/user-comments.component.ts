import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit {
  comments = [];
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getComments();
  }

  // GET COMMENTS
  getComments() {
    this.accountService.getComments().subscribe(res=> {
      this.comments = res.data;
    })
  }
}

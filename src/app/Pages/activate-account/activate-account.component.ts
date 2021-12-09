import { Observable } from 'rxjs';
import { AccountService } from './../../services/account/account.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  loaded = false;
  code: string;
  enable: boolean = false;
  constructor(private api:AccountService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    this.api.activateAccount(this.code).subscribe(res=> {
      console.log(res);
      if(res.status="Success") {
        this.enable = true;
        this.loaded = true;
      }
    }, error => {
      console.log(error);
      if(error.error.status="NotFound") {
        this.enable = false;
        this.loaded = true;
      }
    })
  }

}

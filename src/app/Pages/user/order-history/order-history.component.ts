import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: any = [];
  constructor(private api: AccountService) { }

  ngOnInit() {
    this.getOrders();

  }
  getOrders() {
    this.api.getOrders().subscribe(res=> {
      if(res.status === 'Success') {
        this.orders = res.data;
      }
    });
  }
}

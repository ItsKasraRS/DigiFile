import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {
  paymentStatus;
  isCancelled = false;;
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=> {
      const accessCode = params['AccessCode'];
      this.orderService.checkoutResponse(accessCode).subscribe(res=> {
        if(res.transactionStatus != null) {
          if(res.transactionStatus['status'] === true) {
            this.paymentStatus = true;
            this.orderService.setCount(0);
          }
          else {
            this.paymentStatus = false;
            this.orderService.setCount(0);
          }
        }
        else {
          if(res?.status === 'Cancelled') {
            this.isCancelled = true;
          }
          else {
            this.orderService.setCount(0);
            this.paymentStatus = false;
          }
        }
      })
    })
  }

}

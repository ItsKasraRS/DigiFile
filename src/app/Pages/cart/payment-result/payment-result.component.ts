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
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=> {
      const accessCode = params['AccessCode'];
      this.orderService.checkoutResponse(accessCode).subscribe(res=> {
        if(res.transactionStatus != null) {
          if(res.transactionStatus['status'] === true) {
            this.paymentStatus = true;
          }
          else {
            this.paymentStatus = false;
          }
        }
        else {
          this.paymentStatus = false;
        }
      })
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { PaymentDTO } from 'src/app/DTOs/Order/orderDTO';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductImages } from 'src/app/Utilities/ApiPath';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems;
  imagePath = ProductImages;
  totalPrice = null;
  subTotal = null;
  constructor(private orderService: OrderService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    this.orderService.showCart().subscribe(res=> {
      this.cartItems = res.data;
      if(this.cartItems !== null) {
        for (var index = 0; index < this.cartItems.length; index++) {
          const price = this.cartItems[index].price;
          this.subTotal = Math.round((this.subTotal + price)*100)/100;
          console.log(this.subTotal)
          this.totalPrice = Math.round((this.totalPrice + price)*100)/100;
          // console.log(parseFloat(this.totalPrice))
        }
      }
    })
  }

  removeItemFromCart(id: number) {
    
    this.orderService.removeItemFromCart(id).subscribe(res=> {
      if(res.status === 'Success') {
        this.cartItems = res.data;
        if(this.cartItems !== null) {
          for (var index = 0; index < this.cartItems.length; index++) {
            this.totalPrice += this.cartItems[index].price;
          }
        }
        this.orderService.getCount().subscribe(res=> {
          this.orderService.setCount(res['data']);
        })
        this.router.navigateByUrl('/redirect', {skipLocationChange: true }).then(() => {
          this.router.navigate(['/cart'])
        });
        this.toast.warning('Product successfully removed!');
      }
    });
  }

  checkoutRequest() {
    const model = new PaymentDTO(this.totalPrice);

    this.orderService.checkoutRequest(model).subscribe(res=> {
      window.location.href = res.result['sharedPaymentUrl'];
    })
  }
}

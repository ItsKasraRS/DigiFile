import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductGallery, ProductImages } from 'src/app/Utilities/ApiPath';
import { ScriptLoader } from 'src/app/Utilities/script-loader';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product = {};
  imagePath = ProductImages;
  galleryPath = ProductGallery;
  productStatus;
  isProductInCart = false;
  constructor(private activatedRoute: ActivatedRoute, private api: ProductService, private orderApi: OrderService, private toast: ToastrService, @Inject(DOCUMENT) document: Document) { 
    ScriptLoader.prototype.loadScript('/assets/js/gallerySlider.js');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res=> {
      this.api.getProductDetails(res['id']).subscribe(res=> {
        if(res.status === "Success") {
          this.product = res.data;
          this.orderApi.isExistProductInOrder(this.product['id']).subscribe(res=> {
            this.productStatus = res.status;
            if(res.status === 'IsExist') {
              this.isProductInCart = true;
            }
          })
        }
      });
    })
  }

  addToCart(id: number) {
    this.orderApi.addToCart(id).subscribe(res=> {
      if(res.status === "Success") {
        this.orderApi.getCount().subscribe(res=> {
          this.orderApi.setCount(res['data']);
        })
        this.toast.success('Product added to cart!');
        this.productStatus === 'IsExist';
        this.isProductInCart = true;
      }
    })
  }
}

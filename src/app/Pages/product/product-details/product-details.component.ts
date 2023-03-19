import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductGallery, ProductImages, SimpleDomainName } from 'src/app/Utilities/ApiPath';
import { ScriptLoader } from 'src/app/Utilities/script-loader';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommentService } from 'src/app/services/comment/comment.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddCommentDTO } from 'src/app/DTOs/Product/commentsDTO';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  imagePath = ProductImages;
  galleryPath = ProductGallery;

  product = {};
  productStatus = 'NotExist';
  isProductInCart = false;
  productId;

  gallery = [];

  isAuthenticated = false;
  comments = [];
  commentsLoaded = false;
  userImage = SimpleDomainName + 'user/';
  commentForm: FormGroup = null;

  constructor(private activatedRoute: ActivatedRoute, private api: ProductService, private orderApi: OrderService, private toast: ToastrService, @Inject(DOCUMENT) document: Document, private commentService: CommentService, private accountService: AccountService, private router: Router) { 
    this.commentForm = new FormGroup({
      text: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res=> {
      this.productId = res['id'];

      this.api.getProductDetails(res['id']).subscribe(res=> {
        if(res.status === "Success") {
          this.product = res.data;
          this.api.getProductGallery(this.product['id']).subscribe(res=> {
            this.gallery = res.data;
            ScriptLoader.prototype.loadScript('/assets/js/gallerySlider.js');
          })

          this.isLoggedIn();
          this.getComments(this.product['id']);

          if(this.isAuthenticated) {
            this.orderApi.isExistProductInOrder(this.product['id']).subscribe(res=> {
              this.productStatus = res.status;
              if(res.status === 'IsExist') {
                this.isProductInCart = true;
                this.productStatus = 'IsExist';
              }
            })
          }
        }
      });
    })
  }

  isLoggedIn() {
    this.accountService.checkAuth().subscribe(res=> {
      if(res.status === "Success") {
        this.accountService.setAuth(true);
      }
      else {
        this.accountService.setAuth(false);
      }
    })
    this.accountService.Authenticated().subscribe(res=> {
      this.isAuthenticated = res;      
    });
  }

  addToCart(id: number) {
    if(this.isAuthenticated) {
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
    else {
      this.toast.warning('Please Login in to your account');
    }
  }

  getComments(id: number) {
    this.commentService.getProductComments(id).subscribe(res=> {
      this.comments = res['data'];
      this.commentsLoaded = true;
    })
  }

  addComment() {
    if (this.commentForm.valid) {
      const model = new AddCommentDTO(this.commentForm.controls.text.value);

      this.commentService.addComment(this.productId, model).subscribe(res => {
        if(res.status === 'Success') {
          this.toast.success(res.message);
          this.commentForm.reset();
        }
      })
    }
    else {
      this.commentForm.markAllAsTouched();
    }
  }
}

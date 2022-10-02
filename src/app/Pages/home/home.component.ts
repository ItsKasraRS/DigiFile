import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductImages } from 'src/app/Utilities/ApiPath';
import { ScriptLoader } from 'src/app/Utilities/script-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latestProducts: any;
  productImage = ProductImages;
  constructor(private productService: ProductService) { 
    ScriptLoader.prototype.loadScript('/assets/js/HomeSlider.js');
  }
  ngOnInit(): void {
    this.getLatestProducts();
  }

  getLatestProducts() {
    this.productService.getLatestProducts().subscribe(res=> {
      this.latestProducts = res.data;
    })
  }
}
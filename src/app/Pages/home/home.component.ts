import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { ScriptLoader } from 'src/app/Utilities/script-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latestProducts: any;
  popularProducts: any;

  constructor(private productService: ProductService) { 
    ScriptLoader.prototype.loadScript('/assets/js/HomeSlider.js');
  }
  ngOnInit(): void {
    this.getLatestProducts();
    this.getPopularProducts();
  }

  getLatestProducts() {
    this.productService.getLatestProducts().subscribe(res=> {
      this.latestProducts = res.data;
    })
  }

  getPopularProducts() {
    this.productService.getPopularProducts().subscribe(res => {
      this.popularProducts = res.data;
    })
  }
}
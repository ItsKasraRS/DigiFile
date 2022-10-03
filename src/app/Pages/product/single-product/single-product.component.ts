import { Component, OnInit, Input } from '@angular/core';
import { ProductImages } from 'src/app/Utilities/ApiPath';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input() product;
  productImage = ProductImages;
  constructor() { }

  ngOnInit(): void {
  }

}

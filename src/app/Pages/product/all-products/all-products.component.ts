import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FilterProductDTO } from 'src/app/DTOs/Product/productsDTO';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  navigationSubscription;
  filterProducts: FilterProductDTO;
  pages: number[] = [];
  activePage: any;
  loaded = false;
  products: any;
  categories: [];
  selectedCategories: number[];
  title: string = '';


  constructor(private productService: ProductService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  // WHEN INITIAL
  initialiseInvites() {
    this.getProducts(this.title);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res=> {
      if(res['q']) {
        this.title = res['q'];
      }
    })
    this.getCategories();
    this.getProducts(this.title);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

  // PRIMARY STUFF
  getCategories() {
    this.categoryService.getCategories().subscribe(res=> {
      this.categories = res.data;
    })
  }

  getProducts(title: string) {
    this.productService.filterProducts(title).subscribe(res=> {
      this.products = res.data.products;
      this.loaded = true;
    })
  }

  // FILTER STUFF
  searchByTitle() {
    this.router.navigateByUrl('/register', {skipLocationChange: true }).then(() => {
      this.router.navigate(['/products'], {queryParams: { q: this.title ? this.title : ''}})
    });
  }

}

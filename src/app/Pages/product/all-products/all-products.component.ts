import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FilterProductDTO, ProductSortBy } from 'src/app/DTOs/Product/productsDTO';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  navigationSubscription;
  filterProducts: FilterProductDTO = new FilterProductDTO('', [], 1, 0, 0, 0, 12, 0, 1, [], ProductSortBy.NotSelected);
  pages: number[] = [];
  activePage: any;
  loaded = false;
  products: any;
  categories: [];
  selectedCategories = '';
  sortBy: string = 'sortBy';

  constructor(private productService: ProductService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getProducts(this.filterProducts.title, this.sortBy, this.selectedCategories, this.filterProducts.pageId);
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res=> {
      if(res['q']) {
        this.filterProducts.title = res['q'];
      }
      if(res['sortBy']) {
        this.sortBy = res['sortBy'];
      }
      if(res['categories']) {
        this.selectedCategories = res['categories']
      }
      if(res['pageId']) {
        this.filterProducts.pageId = res['pageId'];
      }
    })
    this.getCategories();
    this.getProducts(this.filterProducts.title, this.sortBy, this.selectedCategories, this.filterProducts.pageId);
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

  getProducts(title: string, sortBy: string, categoryId, pageId) {
    this.productService.filterProducts(title, sortBy, categoryId, pageId).subscribe(res=> {
      this.products = res.data.products;
      this.filterProducts = res.data;
      this.loaded = true;
      this.pages = [];
      for(let i = this.filterProducts.startPage;i <= this.filterProducts.endPage;i++){
        this.pages.push(i);        
      }
    })
  }

  // FILTER STUFF
  searchByTitle() {
    this.router.navigateByUrl('/redirect', {skipLocationChange: true }).then(() => {
      this.router.navigate(['/products'], {queryParams: { q: this.filterProducts.title ? this.filterProducts.title : ''}})
    });
  }
  productSortBy() {
    this.router.navigateByUrl('/redirect', {skipLocationChange: true }).then(() => {
      this.router.navigate(['/products'], {queryParams: { q: this.filterProducts.title ? this.filterProducts.title : '', sortBy: this.sortBy && this.sortBy !== 'sortBy' ? this.sortBy : ''}})
    });
  }
  findByCategory(id: number) {
    this.selectedCategories = id.toString();
    this.router.navigateByUrl('/redirect', {skipLocationChange: true }).then(() => {
      this.router.navigate(['/products'], {queryParams: { q: this.filterProducts.title ? this.filterProducts.title : '', sortBy: this.sortBy && this.sortBy !== 'sortBy' ? this.sortBy : '', categories: this.selectedCategories != null || undefined ? this.selectedCategories : null}})
    });
  }
  setPage(page) {
    this.filterProducts.pageId = page;
    this.router.navigateByUrl('/redirect', {skipLocationChange: true }).then(() => {
      this.router.navigate(['/products'], {queryParams: { q: this.filterProducts.title ? this.filterProducts.title : '', sortBy: this.sortBy && this.sortBy !== 'sortBy' ? this.sortBy : '', pageId: page}})
    });
  }
}

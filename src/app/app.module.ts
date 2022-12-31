import { FileShopInterceptor } from './Utilities/Interceptor/file-shop.interceptor';
import { AccountService } from './services/account/account.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLoadingModule } from 'ngx-loading';


// Material Components
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';

import {ObserversModule} from '@angular/cdk/observers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { NoLayoutComponent } from './Layouts/no-layout/no-layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { MainHeaderComponent } from './Layouts/main-header/main-header.component';
import { MainFooterComponent } from './Layouts/main-footer/main-footer.component';
import { TestComponent } from './Pages/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ActivateAccountComponent } from './Pages/activate-account/activate-account.component';
import { AppGuard } from './guards/app.guard';
import { DashboardComponent } from './Pages/user/dashboard/dashboard.component';
import { UserSidebarComponent } from './Pages/user/user-sidebar/user-sidebar.component';
import { CategoriesFilter } from './Utilities/AppFilters';
import { SingleProductComponent } from './Pages/product/single-product/single-product.component';
import { AllProductsComponent } from './Pages/product/all-products/all-products.component';
import { RedirectComponent } from './Layouts/redirect/redirect.component';
import { ProductDetailsComponent } from './Pages/product/product-details/product-details.component';
import { CartComponent } from './Pages/cart/cart.component';
import { ProductService } from './services/product/product.service';
import { CategoryService } from './services/category/category.service';
import { OrderService } from './services/order/order.service';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    NoLayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MainHeaderComponent,
    MainFooterComponent,
    TestComponent,
    ActivateAccountComponent,
    DashboardComponent,
    UserSidebarComponent,
    ProductDetailsComponent,
    CartComponent,
    //Pipes
    CategoriesFilter,
         SingleProductComponent,
         AllProductsComponent,
         RedirectComponent,
  ],
  imports: [
    HttpClientModule,
   MatFormFieldModule,
   MatDialogModule,
   MatInputModule,
   ObserversModule,
   MatProgressSpinnerModule,
   MatCheckboxModule,
   MatTabsModule,
   BrowserModule,
   AppRoutingModule,
   BrowserAnimationsModule,
   BrowserAnimationsModule,
   FormsModule,
   ReactiveFormsModule,
   NgxLoadingModule.forRoot({
    backdropBackgroundColour: 'rgba(255, 255, 255, 1)',
    primaryColour: '#000000',
    secondaryColour: '#000000',
   }),
   ToastrModule.forRoot({
    positionClass: 'toast-bottom-center'
   }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FileShopInterceptor, multi: true },
    AccountService,
    ProductService,
    CategoryService,
    OrderService,
    AppGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

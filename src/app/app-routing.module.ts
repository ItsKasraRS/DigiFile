import { TestComponent } from './Pages/test/test.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { NoLayoutComponent } from './Layouts/no-layout/no-layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './Pages/activate-account/activate-account.component';
import { AppGuard } from './guards/app.guard';
import { DashboardComponent } from './Pages/user/dashboard/dashboard.component';
import { AllProductsComponent } from './Pages/product/all-products/all-products.component';
import { RedirectComponent } from './Layouts/redirect/redirect.component';
import { ProductDetailsComponent } from './Pages/product/product-details/product-details.component';
import { CartComponent } from './Pages/cart/cart.component';
import { EditProfileComponent } from './Pages/user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './Pages/user/change-password/change-password.component';
import { OrderHistoryComponent } from './Pages/user/order-history/order-history.component';
import { PaymentResultComponent } from './Pages/cart/payment-result/payment-result.component';
import { UserCommentsComponent } from './Pages/user/user-comments/user-comments.component';
import { ComingSoonComponent } from './Layouts/coming-soon/coming-soon.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, data: { title: 'Home' } },
      { path: 'register', component: RegisterComponent, data: { title: 'Register' }  },
      { path: 'products', component: AllProductsComponent, data: { title: 'Products' }, runGuardsAndResolvers: 'always' },
      { path: 'product/:id', component: ProductDetailsComponent, data: { title: 'Product' } },
      { path: 'cart', component: CartComponent, canActivate: [AppGuard], data: { title: 'Your cart' } },
      { path: 'payment-result', component: PaymentResultComponent, canActivate: [AppGuard], data: { title: 'Payment Result' } },
      { path: 'redirect', component: RedirectComponent, data: { title: 'Redirecting' } },
      { path: 'coming-soon', component: ComingSoonComponent, data: { title: 'Coming soon ...' } },

      // User Panel Routes
      { path: 'user/dashboard', component: DashboardComponent, canActivate: [AppGuard], data: { title: 'Dashboard' } },
      { path: 'user/edit-profile', component: EditProfileComponent, canActivate: [AppGuard], data: { title: 'Edit profile' } },
      { path: 'user/change-password', component: ChangePasswordComponent, canActivate: [AppGuard], data: { title: 'Change password' } },
      { path: 'user/order-history', component: OrderHistoryComponent, canActivate: [AppGuard], data: { title: 'Order history' } },
      { path: 'user/comments', component: UserCommentsComponent, canActivate: [AppGuard], data: { title: 'User comments' } }
    ]
  },
  {
    path: '',
    component: NoLayoutComponent,
    children: [
      { path: 'ActivateAccount/:code', component: ActivateAccountComponent, data: { title: 'Activate account' }},
      { path: 'test', component: TestComponent, data: { title: 'Test' }, canActivate: [AppGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, data: { title: 'Home' } },
      { path: 'register', component: RegisterComponent, data: { title: 'Register' }  },
      { path: 'user/dashboard', component: DashboardComponent, canActivate: [AppGuard], data: { title: 'Dashboard' } }
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

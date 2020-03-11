import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component'
import { ProductViewComponent } from './product-view/product-view.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AuthGuard } from './auth.guard';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  { path : '', component : HomeComponent},
  { path : 'login', component : LoginComponent},
  { path : 'register', component : RegisterComponent},
  { path : 'products', component: ProductsComponent},
  { path : 'product/:productId', component: ProductViewComponent},
  { path : 'cart', component: CartViewComponent, canActivate : [AuthGuard]},
  { path : 'create-product', component: CreateProductComponent, canActivate : [AuthGuard]},
  { path : 'product/:productId/edit', component : ProductEditComponent, canActivate : [AuthGuard]},
  { path : 'profile', component : ProfileViewComponent, canActivate : [AuthGuard]},
  { path : 'profile/edit', component : ProfileEditComponent, canActivate : [AuthGuard]},
  { path : 'profile/change-password', component : PasswordChangeComponent, canActivate : [AuthGuard]},
  { path : 'orders', component : OrderHistoryComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

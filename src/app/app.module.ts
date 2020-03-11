import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule }    from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProductsComponent,
    ProductViewComponent,
    CartViewComponent,
    CreateProductComponent,
    ProductEditComponent,
    ProfileViewComponent,
    ProfileEditComponent,
    PasswordChangeComponent,
    OrderHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ cookieName: 'csrftoken', headerName: 'X-CSRFToken' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

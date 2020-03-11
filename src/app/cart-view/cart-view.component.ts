import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  products;
  productsPresent : boolean;
  orderSuccess : boolean;
  dataReturn : boolean;
  constructor(public cartService : CartService, private orderService : OrderService, private router : Router) { 
    
  }

  ngOnInit(): void {
    this.orderSuccess = false;
    this.dataReturn = false;
    this.productsPresent = false;
    if(this.cartService.products.length >0){ 
      this.products = this.cartService.products;
      this.productsPresent = true;
      console.log(this.products);
    }
  }


  createOrder(){
    let bodyParams = {};
    bodyParams['user'] = JSON.parse(localStorage.getItem('currentUser'))['user_id']
    bodyParams['products'] = JSON.parse(localStorage.getItem('productIds'));
    this.orderService.createOrder(bodyParams).subscribe(
      data =>{
        this.dataReturn = true;
        this.orderSuccess = true;
        setTimeout( () => {
          this.cartService.clearCart();
          this.router.navigate(['orders']);
        }, 2000);

        console.log("Data");
        console.log(data)
      },
      error => {
        this.dataReturn = true;
        this.orderSuccess = false;
        console.log(error);
      }
    );
  }

}

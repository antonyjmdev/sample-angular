import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products : Array<Product>;
  productIds : Array<number>;



  constructor() {
    if(localStorage.getItem('cartItems') != null && localStorage.getItem('productIds') != null){
      this.products = JSON.parse(localStorage.getItem('cartItems'));
      this.productIds = JSON.parse(localStorage.getItem('productIds'));
    }
    else
    {
      this.products = [];
      this.productIds = [];
    }

   }

   addToCart(product: Product): boolean{
     if(!this.productInCart(product.id)){
      this.products.push(product);
      this.productIds.push(product.id)
      localStorage.setItem('cartItems',JSON.stringify(this.products));
      localStorage.setItem('productIds', JSON.stringify(this.productIds))

      return true;
     }

     return false;

   }

   removeFromCart(product : Product) : boolean{
     if(this.productInCart(product.id)){
      this.productIds.splice(this.productIds.indexOf(product.id), 1);
      this.products.splice(this.products.findIndex((prod) =>{ return prod==product } ),1);
      localStorage.setItem('cartItems',JSON.stringify(this.products));
      localStorage.setItem('productIds', JSON.stringify(this.productIds));
      return true;
    }
    return false;
     
   }

   clearCart(){
     this.productIds = []
     this.products = [];
     localStorage.setItem('cartItems', JSON.stringify('[]'));
     localStorage.setItem('productIds', JSON.stringify('[]'));
   }

   productInCart(id : number){

    if( this.productIds.find((pid) => {return pid == id; }) == undefined){
      return false;
    }
    else{
      return true;
    }

   }


}

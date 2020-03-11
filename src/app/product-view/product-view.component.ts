import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router'; 
import { CartService } from '../cart.service';
import { Product } from '../product';
import { AuthenticationService } from '../authentication.service';
declare var $:any;

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  productId : string;
  product: Product;
  addedToCart: boolean;
  private state : RouterStateSnapshot;

  constructor(private productService : ProductService, private route : ActivatedRoute,
     private cartService : CartService, private router: Router,
     private authenticationService: AuthenticationService) {
      
      this.state = this.router.routerState.snapshot;
      }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.productService.getProduct(this.productId).subscribe(
      data =>{
        this.product = data;
        this.addedToCart = this.cartService.productInCart(this.product.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  addToCart(){

    if(this.cartService.addToCart(this.product)){
      this.addedToCart = true;
    }
  
  }

  removeFromCart(){
    if(this.cartService.removeFromCart(this.product)){
      this.addedToCart = false;
    }
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product.id.toString())
    .subscribe(
      data => {
        $("#deleteModal").modal('hide');
        this.router.navigate(['/products']);
      },
      error =>{
        console.log(error);
      }
    );
  }

  public get loggedIn(): boolean{
    if(this.authenticationService.currentUserValue){
      return true;
    }
    
    return false;

  }

  goToLogin(){
    this.router.navigate(['/login'], { queryParams : {returnUrl : this.state.url}})
  }

}

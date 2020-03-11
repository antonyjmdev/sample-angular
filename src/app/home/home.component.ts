import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    count : number;
    loading : boolean;
    reqSuccess : boolean;
  constructor(private productService : ProductService ) { }

  ngOnInit(): void {
    this.loading = true;
    this.reqSuccess = false;
    this.productService.getProductsPromise("", "").then(
      (result) => {
        this.count = result.length;
        this.loading = false;
        this.reqSuccess = true;
      },
      (error) => {
        this.loading = false;
        this.reqSuccess = false;
      }
    );
  }

}

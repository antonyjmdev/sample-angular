import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import  { ProductService } from '../product.service';
import { Order } from '../product';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: Array<Order>;
  loading : boolean;

  constructor(private orderService : OrderService, private productService : ProductService) {
    this.orders = [];
    
   }

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getAllOrders().subscribe(
      async data =>  {
        let ordersJSON : Array<JSON>= [];
       
        ordersJSON = ordersJSON.concat(data);

        for(let order of ordersJSON) {
          let prods : Array<string> = [];
          for( let id of order['products']){

            prods.push(await this.getProductName(id));
          }

          let o : Order = { id : order['id'], date : order['date'], products : prods};
          // console.log(prods);
          this.orders.push(o);
          // console.log(order)
        }

        this.loading = false;
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  async getProductName(productId){
      let productName = "";
      await this.productService.promiseGetProduct(productId).then(
        (result) => {
          productName = result['name']
        },
        (error) => {
          console.log(error);
        }
      );
      return productName;
     
  }

}

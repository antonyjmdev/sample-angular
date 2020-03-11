import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { urls } from './urls.json';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private http : HttpClient) { }



  createOrder(bodyParams){
    return this.http.post( urls.orders_url, JSON.stringify(bodyParams), this.httpOptions).pipe(
      map(
        key => {
          return key;
        }
      )
    );
  }


  getAllOrders(){
    let first_name = JSON.parse(localStorage.getItem('currentUser'))['username'];
    let params = {'search' : first_name};
    this.httpOptions['params'] = params;

    return this.http.get<Array<JSON>>(urls.orders_url, this.httpOptions).pipe(
      map(
        key => {
          return key;
        }
      )
    );
  }

}

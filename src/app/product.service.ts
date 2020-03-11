import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from './urls.json';
import { map, count } from 'rxjs/operators';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  getProducts(search : string, rating : string){
    let params = {};
    if(search != "") params['search'] = search;
    if(rating != "") params['rating'] = rating;

    this.httpOptions['params'] = params;
    return this.http.get<Product[]>( urls.get_products, this.httpOptions ).pipe(
      map( key =>{
        return key;
      })
    );

  }

  async getProductsPromise(search : string, rating : string){
    let params = {};
    if(search != "") params['search'] = search;
    if(rating != "") params['rating'] = rating;

    this.httpOptions['params'] = params;
    return await this.http.get<Product[]>( urls.get_products, this.httpOptions ).pipe(
      map( key =>{
        return key;
      })
    ).toPromise();

  }



  getProduct(id){

    return this.http.get<Product>( urls.get_product.replace('{id}',id.toString()), this.httpOptions)
    .pipe( map( key => {
        return key;
      })
    );
  }

  promiseGetProduct(id){

    return this.http.get<Product>( urls.get_product.replace('{id}',id.toString()), this.httpOptions).pipe(
      map(
        key => {
          return key;
        }
      )
    )
    .toPromise();
  }

  createProduct(formData : FormData){

    return this.http.post( urls.create_product, formData)
    .pipe( map( key => {
      return key;
    }));
  }

  editProduct(id : string, formData : FormData){

    return this.http.put(urls.edit_product.replace('{id}',id), formData)
    .pipe( map(
      key => {
        return key;
      }
    ))

  }

  deleteProduct(id : string){
    return this.http.delete(urls.delete_product.replace('{id}',id))
    .pipe(map(
      key =>{
        return key;
      }
    ));

  }




}

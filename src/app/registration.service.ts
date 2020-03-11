import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  registrationUrl = "https://angular-backend-sayone.herokuapp.com/api/v1/rest-auth/registration/";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };


  constructor(private http : HttpClient) { }

  register(
    email : string,
    first_name : string,
    last_name : string,
    password1 : string,
    password2 : string,
    mobile : string,
    gender : string,
    user_type : string
  ){

    let messageBody = { 'email': email, 'first_name': first_name, 'last_name': last_name,
                        'password1': password1, 'password2': password2 }
              

    if(mobile != ""){
      messageBody['mobile'] = mobile;
    }

    if(gender != ""){
      messageBody['gender'] = gender;
    }

    if(user_type != ""){
      messageBody['user_type'] = user_type;
    }
    
    
    return this.http.post( this.registrationUrl, JSON.stringify(messageBody), this.httpOptions )
    .pipe(
      map( key => {
        return key;
      })
    );

  }


}

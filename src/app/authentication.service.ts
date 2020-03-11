import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { urls } from './urls.json'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<JSON>;
    public currentUser: Observable<JSON>;
    diplayName : string;
    public loggedIn : boolean;

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<JSON>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        if(this.currentUserSubject.value){
          this.loggedIn = true;
        }
        else{
          this.loggedIn = false;
        }
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }


    login(email, password) {

        return this.http.post<JSON>(urls.login_url ,JSON.stringify({
          "email":email,
          "password":password
        }), this.httpOptions)
            .pipe(map(key => {
                let user : string = `{ "email" : "${email}", "key" : ${JSON.stringify(key['key'])} }`;
                localStorage.setItem('currentUser', user);
                this.currentUserSubject.next(JSON.parse(user));
                this.loggedIn = true;
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.loggedIn = false;
        this.currentUserSubject.next(null);
    }
}
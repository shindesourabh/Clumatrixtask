import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  constructor( private http: HttpClient) { }

login(username: string, password: string) { debugger
  //"username": "kminchelle",
  //"password": " "
  // https://dummyjson.com/auth/login

//   "email:test@aniket.com
// password:12345678"
// https://bookmystore.co/api/newlogin
  return this.http.post<any>(`https://dummyjson.com/auth/login`, { username, password })
      .pipe(
          // delay(1000),
          map((response) => {
            this.isLoggedIn = true;
                  return response;  
          }));
}
logout(): void {
  this.isLoggedIn = false;
}
isLoggedInUser(): boolean {
  return this.isLoggedIn;
}
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
    // https://jsonplaceholder.typicode.com/todos/1
  }
  category(){
    return this.http.get<any>(`https://bookmystore.co/api/pro_category?ad=1`)
        .pipe(
            map((response) => {
                return response;
            }));
}

getProductList(){
  return this.http.get<any>(`https://bookmystore.co/api/prolist`)
      .pipe(
          map((response) => {
              return response;
          }));
}

addProduct(newProduct : any) {debugger
  return this.http.post<any>(`https://bookmystore.co/api/addpro`, newProduct)
      .pipe(
          // delay(1000),
          map((response) => {
              return response;
          }));
}
getComodityType(){
  return this.http.get<any>(`https://bookmystore.co/api/commodity_type`)
  .pipe(
      map((response) => {
          return response;
      }));
}

get_SuperSubCatergory(){
//  const catid = localStorage.getItem('categoryId') ;
const catid = 2
  return this.http.get<any>(`https://bookmystore.co/api/super_sub_category_by_cat/${catid}`)
  .pipe(
      map((response) => {
          return response;
      }));
}
get_SubCategory(){
  const supersubcatid = localStorage.getItem('supersubcatid')
    return this.http.get<any>(`https://bookmystore.co/api/sub_category_by_subcat/${supersubcatid}
    `)
    .pipe(
        map((response) => {
            return response;
        }));
  }
  getPackage(){
    const packageId = localStorage.getItem('packageId')
  return this.http.get<any>(`https://bookmystore.co/api/package`)
  .pipe(
      map((response) => {
          return response;
      }));
  }
}

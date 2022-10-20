import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productList!: Product;

  constructor(private http: HttpClient) { }

  getProduct(): Observable<any>{
    return this.http.get<any>('https://efuktshirts.com/products.json')
    .pipe(
      tap((data:any)=> {
        this.productList = data
      })
    )
  }


}

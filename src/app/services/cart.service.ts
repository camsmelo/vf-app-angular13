import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, pluck, Subject } from 'rxjs';
import {  Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];

  mycart = new Subject<any>()

  quantity!: number;

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  productBehavior$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
  }

  addToCard(cartItemParam: any) {

    this.productBehavior$.subscribe({
      next:(data) => {
        this.cartItems = data
        this.cartItems.push(cartItemParam);
        this.quantity = this.cartItems.length;
        this.cartTotal();
        console.log(data)
      }
    })
      this.productBehavior$.next(cartItemParam)

  }

  cartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let cartItem of this.cartItems) {
      totalPriceValue += Number(cartItem.variants[0].price);
      totalQuantityValue += cartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(this.quantity);
  
  }

}

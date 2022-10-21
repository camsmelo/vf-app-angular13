import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];

  quantity!: number;

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  productBehavior: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) {}

  addToCard(cartItemParam: any) {
    this.addProduct(cartItemParam);
    this.cartItems.push(cartItemParam);
    this.quantity = this.cartItems.length;
    this.cartTotal();
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

  addProduct(product: any) {
    this.productBehavior.next(product);
  }

}

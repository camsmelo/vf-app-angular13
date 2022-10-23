import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productsList: any[] = []

  public acceptedBookings:Observable<Product[]>;

  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  productReceive: any;

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
   this.cartService.productBehavior$.subscribe({
    next:(data) => {
      this.productReceive = data;
      this.updateCartStatus()
    }
   })
   this.cartService.productBehavior$.next(this.productsList)
  }
  

  updateCartStatus() {
    this.cartService.totalQuantity.subscribe({
      next: (data: any) => {
        this.totalQuantity = data;
      },
    });

    this.cartService.totalPrice.subscribe({
      next: (data: any) => {
        this.totalPrice = data;
      },
    });
 
  }

  remove(index) {
    this.cartService.removeItem(index);
  }

}

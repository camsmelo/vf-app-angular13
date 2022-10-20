import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {

  totalPrice: number = 0.0;
  totalQuantity: number = 0;
  productList: any;

  constructor(private cartService: CartService,
     private productsService: ProductsService) {}

  ngOnInit(): void {
    this.updateCartStatus();
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
}

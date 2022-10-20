import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productsList: any[] = [];

  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  productReceive: any;

  constructor(
    private cartService: CartService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.updateCartStatus();
    this.teste();
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

  remove(id: any) {
    let index = this.productsList.findIndex((e:any) => {
      e.id === id;
    });
    if (index !== 1) {
      this.productsList.splice(index, 1);
      window.location.reload();
    }
  }

  teste() {
   
    this.cartService.productBehavior.subscribe((data: any) => {
      this.productReceive = data;
    });
    this.add(this.productReceive)
  }

  add(item: Product){
    this.productsList.push(item)
  }
}

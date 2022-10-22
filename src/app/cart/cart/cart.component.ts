import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

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
    this.updateCartStatus();
    this.cartService.addToCard(this.productsList);
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

    this.cartService.productBehavior$.subscribe((data: any) => {
      this.productReceive = data;
    });
  }

  remove(id: any) {
    let index = this.productsList.findIndex((e:any) => {
      e.id === id;
    });
    if (index !== 1) {
      this.productsList.splice(index, 1);   
    }
  }

}

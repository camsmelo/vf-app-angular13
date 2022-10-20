import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productsList!: any[];
  item!: any[];

  product: any;
  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    return this.productsService.getProduct().subscribe((res: any) => {
      this.productsList = res.products;
    });
  }

  sortTitleAtoZ() {
    this.productsList.sort((a, b) => (a.title < b.title ? -1 : 1));
  }

  sortTitleZtoA() {
    this.productsList.sort((a, b) => (a.title > b.title ? -1 : 1));
  }

  sortHighPrice() {
    this.productsList.sort((a, b) => b.variants[0].price - a.variants[0].price);
  }

  sortLowPrice() {
    this.productsList.sort((a, b) => {
      if (Number(a.variants[0].price) < 0) {
        return 1;
      }
      if (Number(b.variants[0].price < 0)) {
        return -1;
      }
      return Number(a.variants[0].price) - Number(b.variants[0].price);
    });
  }

  addToCart(product: any) {
    this.cartService.addToCard(product);
  }
}

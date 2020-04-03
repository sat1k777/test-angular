import { Injectable } from '@angular/core';
import Product from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];

  constructor() {}

  getProducts() {
    return this.products.slice();
  }

  getProduct(id: string) {
    return this.products[+id];
  }

  setProducts(products: Product[]) {
    return (this.products = products);
  }
}

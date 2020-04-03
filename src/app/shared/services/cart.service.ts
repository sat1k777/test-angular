import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Cart from '../models/cart.model';

import Product from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  onCartUpdated = new Subject<void>();
  private cart: Cart = { items: [], totalPrice: 0 };

  constructor() {}

  addToCart(item: { product: Product; amount: number }) {
    const cart = { ...this.cart };
    cart.items.push(item);
    this.cart = { ...cart };
    console.log(cart);
    return this.onCartUpdated.next();
  }

  getCart() {
    return { ...this.cart };
  }

  getSizeOfCart() {
    return this.cart.items.length;
  }

  emptyCart() {
    const cart = { ...this.cart };
    cart.items = [];
    this.cart = { ...cart };
    return this.onCartUpdated.next();
  }
}

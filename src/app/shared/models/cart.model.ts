import Product from './products.model';

interface Item {
  product: Product;
  amount: number;
}

export default class Cart {
  constructor(public items: Item[], public totalPrice: number) {}
}

import Product from './products.model';

interface Item {
  product: Product;
  amount: number;
}

export default class Cart {
  constructor(private items: Item[], private totalPrice: number) {}
}

import Product from './products.model';
import UserData from './user-data.model';

interface Item {
  product: Product;
  amount: number;
}

export default class Order {
  constructor(
    public userData: UserData,
    public items: Item[],
    public totalPrice: number,
    public id?: string
  ) {}
}

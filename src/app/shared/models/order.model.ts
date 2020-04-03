import Product from './products.model';

interface Item {
  product: Product;
  amount: number;
}

interface User {
  fullname: string;
  email: string;
  city: string;
  phoneNumber: string;
  address: string;
  zipcode: string;
}

export default class Order {
  constructor(
    public userData: User,
    public items: Item[],
    public totalPrice: number,
    public id?: string
  ) {}
}

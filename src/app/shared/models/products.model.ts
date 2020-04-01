export default class Product {
  constructor(
    private title: string,
    private type: string,
    private description: string,
    private image: string,
    private height: number,
    private width: number,
    private price: number,
    private rating: number
  ) {}
}

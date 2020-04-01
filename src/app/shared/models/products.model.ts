export default class Product {
  constructor(
    public title: string,
    public type: string,
    public description: string,
    public image: string,
    public height: number,
    public width: number,
    public price: number,
    public rating: number
  ) {}
}

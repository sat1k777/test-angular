import { Component, OnInit, Input } from '@angular/core';

import Product from 'src/app/shared/models/products.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() id: number;
  isBuying = false;
  modalTitle = '';

  constructor() {}

  ngOnInit(): void {}

  onBuyNow() {
    this.modalTitle = `Buying ${this.product.title}`;
    this.isBuying = true;
  }

  onAddToCart() {}

  isClosed() {
    this.isBuying = false;
  }
}

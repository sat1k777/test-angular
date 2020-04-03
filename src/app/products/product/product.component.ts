import { Component, OnInit, Input } from '@angular/core';

import Product from 'src/app/shared/models/products.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onBuyNow(event: Event) {
    event.stopPropagation();
    this.modalTitle = `Buying ${this.product.title}`;
    this.isBuying = true;
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    this.cartService.addToCart({ product: this.product, amount: 1 });
  }

  onView() {
    this.router.navigate([this.id], { relativeTo: this.route });
  }

  isClosed() {
    this.isBuying = false;
  }
}

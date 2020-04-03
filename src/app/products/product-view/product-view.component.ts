import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

import Product from 'src/app/shared/models/products.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: Product;
  id: string;
  isBuying = false;
  modalTitle = '';

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.product = this.productsService.getProduct(this.id);
  }

  onBuyNow() {
    this.modalTitle = `Buying ${this.product.title}`;
    this.isBuying = true;
  }

  isClosed() {
    this.isBuying = false;
  }
  onToProducts() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';

import Product from 'src/app/shared/models/products.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  error = null;

  paginationConfig = {
    itemsPerPage: 9,
    currentPage: 1
  };

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.error = this.route.snapshot.data[0].error;
    this.products = this.productsService.getProducts();
  }
}

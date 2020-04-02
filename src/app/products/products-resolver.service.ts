import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import Product from '../shared/models/products.model';
import { Injectable } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { DataService } from '../shared/services/data.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(
    private productsService: ProductsService,
    private dataService: DataService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const products = this.productsService.getProducts();
    if (products.length === 0) {
      return this.dataService.fetchProducts();
    } else {
      return products;
    }
  }
}

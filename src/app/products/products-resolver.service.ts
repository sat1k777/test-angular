import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import Product from '../shared/models/products.model';
import { Injectable } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { DataService } from '../shared/services/data.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface ResolvedProducts {
  products: Product[];
  error?: any;
}

@Injectable()
export class ProductsResolverService implements Resolve<ResolvedProducts> {
  constructor(
    private productsService: ProductsService,
    private dataService: DataService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResolvedProducts> | ResolvedProducts {
    const products = this.productsService.getProducts();
    if (products.length === 0) {
      return this.dataService.fetchProducts().pipe(
        map(data => ({ products: data })),
        catchError(error => {
          return of({ products: null, error });
        })
      );
    } else {
      return { products };
    }
  }
}

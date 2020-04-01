import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import CONSTANTS from '../misc/constants';
import Product from '../models/products.model';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = CONSTANTS.apiUrl;

  constructor(
    private http: HttpClient,
    private productsService: ProductsService
  ) {}

  fetchProducts() {
    return this.http.get<Product[]>(this.url + 'products.json').pipe(
      tap(products => {
        this.productsService.setProducts(products);
      })
    );
  }
}

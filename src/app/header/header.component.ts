import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartSub: Subscription;
  cartSize = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSize = this.cartService.getSizeOfCart();
    this.cartSub = this.cartService.onCartUpdated.subscribe(update => {
      this.cartSize = this.cartService.getSizeOfCart();
    });
  }

  onCartEmpty() {
    this.cartService.emptyCart();
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit
} from '@angular/core';
import { ClrWizard } from '@clr/angular';

import Product from '../../models/products.model';
import Order from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import UserData from '../../models/user-data.model';

@Component({
  selector: 'app-modal-buy',
  templateUrl: './modal-buy.component.html',
  styleUrls: ['./modal-buy.component.scss']
})
export class ModalBuyComponent implements OnInit {
  @ViewChild('wizard') wizard: ClrWizard;
  @Input() title: string;
  @Input() product: Product;
  @Input() productId: number;
  @Input() isBuying: boolean;
  @Output() isClosed = new EventEmitter<void>();

  // Forms Validation statuses
  userDataFormIsValid = false;
  creditCardFormIsValid = false;

  // Amount of product
  amount = 1;

  // userData
  userDataObj: UserData = null;

  // misc
  loading = false;
  error = null;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {}

  onAmountChanged(amount: number) {
    this.amount = amount;
  }

  onUserDataFormStatusChanged(event: { isValid: boolean; userData: UserData }) {
    this.userDataFormIsValid = event.isValid;
    if (event.isValid) {
      return (this.userDataObj = { ...event.userData });
    }
  }

  onCreditCardFormStatusChanged(isValid: boolean) {
    this.creditCardFormIsValid = isValid;
  }

  creditPageNav(buttonType: string) {
    switch (buttonType) {
      case 'custom-cancel':
        this.onClose();
        return this.wizard.close();
      case 'custom-back':
        return this.wizard.previous();

      default:
        this.wizard.previous();
    }
  }

  onClose() {
    this.isClosed.emit();
  }

  async onCommit() {
    this.loading = true;
    const order: Order = {
      totalPrice: this.product.price * this.amount,
      userData: this.userDataObj,
      items: [
        {
          product: this.product,
          amount: this.amount
        }
      ]
    };

    try {
      const orderId = await this.orderService.createOrder(order);
      this.router.navigate(['checkout', orderId]);
      this.loading = false;
    } catch (error) {
      this.error = error;
      this.loading = false;
    }
  }
}

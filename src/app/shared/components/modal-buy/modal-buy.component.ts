import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit
} from '@angular/core';
import { ClrWizard } from '@clr/angular';
import { CreditCardValidators } from 'angular-cc-library';

import Product from '../../models/products.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Order from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

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

  // Forms
  userDataForm: FormGroup;
  creditCardForm: FormGroup;

  // Realted to product
  amount = 1;

  // userData
  userData: {
    fullname: string;
    email: string;
    phoneNumber: string;
    city: string;
    address: string;
    zipcode: string;
  };

  // misc
  loading = false;
  error = null;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.userDataFormInit();
    this.creditCardFormInit();
  }

  userDataFormInit() {
    this.userDataForm = new FormGroup({
      fullname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^\\d+$')
      ]),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern('^\\d+$')
      ])
    });
  }

  creditCardFormInit() {
    this.creditCardForm = new FormGroup({
      cardNumber: new FormControl(null, [
        CreditCardValidators.validateCCNumber,
        Validators.required
      ]),
      expirationDate: new FormControl(null, [
        Validators.required,
        CreditCardValidators.validateExpDate
      ]),
      cvc: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4)
      ])
    });
  }

  onClose() {
    this.isClosed.emit();
  }

  onAmountKeyPress(event: KeyboardEvent) {
    if (event.key === '.' || event.key === '-' || event.key === ',') {
      return false;
    }
  }

  onBlur(event: FocusEvent) {
    const value = (event.target as HTMLInputElement).value;
    if (value === '' || value === '0') {
      this.amount = 1;
    }
  }

  onUserDataComplete() {
    this.userData = this.userDataForm.value;
  }

  async onCommit() {
    this.loading = true;
    const order: Order = {
      totalPrice: this.product.price * this.amount,
      userData: this.userData,
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

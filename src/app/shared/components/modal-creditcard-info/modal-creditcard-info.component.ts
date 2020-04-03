import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CreditCardValidators } from 'angular-cc-library';
import Product from '../../models/products.model';
import UserData from '../../models/user-data.model';

@Component({
  selector: 'app-modal-creditcard-info',
  templateUrl: './modal-creditcard-info.component.html',
  styleUrls: ['./modal-creditcard-info.component.scss']
})
export class ModalCreditcardInfoComponent implements OnInit {
  @Input() product: Product;
  @Input() error: any;
  @Input() userData: UserData;
  @Input() amount: number;

  @Output() creditCardFormStatusChanged = new EventEmitter<boolean>();

  creditCardForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.creditCardFormInit();
    this.creditCardForm.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.creditCardFormStatusChanged.emit(false);
      } else {
        this.creditCardFormStatusChanged.emit(true);
      }
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
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Product from '../../models/products.model';

@Component({
  selector: 'app-modal-general-info',
  templateUrl: './modal-general-info.component.html',
  styleUrls: ['./modal-general-info.component.scss']
})
export class ModalGeneralInfoComponent implements OnInit {
  @Input() product: Product;
  @Output() amountChanged = new EventEmitter<number>();
  // Realted to product
  amount = 1;

  constructor() {}

  ngOnInit(): void {}

  onAmountChanged(event: number) {
    this.amountChanged.emit(event);
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
}

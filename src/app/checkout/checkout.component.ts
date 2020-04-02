import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';

import Order from '../shared/models/order.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  order: Order;
  orderId: string;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.order = this.orderService.getOrder(this.orderId);
    console.log(this.order);
  }
}

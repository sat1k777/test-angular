import { Injectable } from '@angular/core';
import Order from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: Order[] = [];

  getOrder(id: string) {
    return this.orders.find(order => order.id === id);
  }

  createOrder(order: Order): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const newOrder = { ...order, id: Date.now().toString() };
        if (newOrder.userData.fullname === 'error') {
          reject('Error, dude');
        }
        this.orders.push(newOrder);
        resolve(newOrder.id);
      }, 2500);
    });
    return promise;
  }
}

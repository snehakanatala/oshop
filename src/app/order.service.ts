import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db : AngularFireDatabase, private cartService : ShoppingCartService) { }

  async saveOrder(order : Order) : Promise<any> {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
}

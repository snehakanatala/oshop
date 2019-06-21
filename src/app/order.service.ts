import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Order } from './models/order';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';

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

  getOrders() : Observable<any> {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUserId(userId : string) : Observable<any> {
    // this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges().subscribe(orders => {
    //   console.log(userId);
    //   console.log(orders);
    // });
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }

  getOrder(orderId : string) : Observable<any> {
    return this.db.object('/orders/' + orderId).valueChanges();
  }
}

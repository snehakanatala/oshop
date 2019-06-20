import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Product } from './models/product';
import * as firebase from 'firebase';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { ShoppingCart } from './models/shopping-cart';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  item$;
  cartId : string;

  constructor(private db : AngularFireDatabase) {  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    });
  }

  async getCart() : Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(map((cart : ShoppingCart) => {
      if(!cart.items) cart.items = {};
      return new ShoppingCart(cart.items);
    }));
  }

  private async getOrCreateCartId() : Promise<string> {
  let cartId = localStorage.getItem("cartId");
  if(!cartId) 
    this.create().then(result => {
      localStorage.setItem('cartId', result.key);
    });
    return this.cartId = cartId;    
  }

  private getItem(cartId : string, productId : string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product : Product) {
    let itemSnapshot = await this.getItemSnapshot(product);
    if(itemSnapshot.exists()) {
      let item = itemSnapshot.val();
      this.item$.update({ quantity : item.quantity + 1});
    } else {
      this.item$.set({ product : product, quantity : 1});
    }      
  }

  async removeFromCart(product : Product) {
    let itemSnapshot = await this.getItemSnapshot(product);
    let item = itemSnapshot.val();
    if(item && item.quantity > 1)
      this.item$.update({ quantity : item.quantity - 1});
    if(item && item.quantity === 1)
      this.db.object('/shopping-carts/' + this.cartId + '/items/' + product.key).remove();
  }

  clearCart() {
    this.db.object('/shopping-carts/' + this.cartId + '/items').remove();
  }

  private async getItemSnapshot(product : Product) {
    let cartId = await this.getOrCreateCartId();
    this.item$ = this.getItem(cartId, product.key);
    return firebase.database().ref('/shopping-carts/' + cartId + '/items/' + product.key).once("value", snapshot => {return snapshot;});
  }
   
}

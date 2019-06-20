import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from './shopping-cart';
import { Subscribable, Subscription } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';

export class Order {
    
    
    datePlaced : number;
    items : any;
    totalPrice : number;

    constructor(public userId : string, public shipping: any, public shoppingCart : ShoppingCart) {
        this.datePlaced = new Date().getTime();    
        this.totalPrice = shoppingCart.totalPrice;    
        this.items = shoppingCart.items.map(i => {
            return { 
              product : {
                title : i.product.payload.title,
                price : i.product.payload.price,
                imageUrl : i.product.payload.imageUrl
              },
              quantity : i.quantity,
              totalPrice : i.totalPrice
            };
          });
    }

    
}
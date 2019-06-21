import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Order } from '../models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  userSubscription : Subscription;
  userId : string;
  shipping = {} ;

  @Input('shopping-cart') shoppingCart : ShoppingCart;

  constructor(private orderService : OrderService, 
    private authService : AuthService, 
    private router : Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(x => this.userId = x.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  placeOrder() {   
    const order : Order = new Order(this.userId, this.shipping, this.shoppingCart);    
    this.orderService.saveOrder(order).then(x => this.router.navigateByUrl('/order-success/' + x.key));
  }
}

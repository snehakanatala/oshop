import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {};
  shoppingCart : ShoppingCart;
  cartSubscription : Subscription;
  userSubscription : Subscription;
  userId : string;
  dataSource : MatTableDataSource<any> = new MatTableDataSource();

  constructor(private cartService : ShoppingCartService,
      private orderService : OrderService, 
      private authService : AuthService, 
      private router : Router) {            
  }

  placeOrder() {   
    const order : Order = new Order(this.userId, this.shipping, this.shoppingCart);    
    this.orderService.saveOrder(order).then(x => this.router.navigateByUrl('/order-success/' + x.key));
  }

  async ngOnInit() {    
    this.userSubscription = this.authService.user$.subscribe(x => this.userId = x.uid);
    const cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => {
      this.shoppingCart = cart;
      this.dataSource.data = this.shoppingCart.items;
    }); 
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

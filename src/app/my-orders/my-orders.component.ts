import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})

export class MyOrdersComponent implements OnInit, OnDestroy {

  myOrders : Order[];
  subscription : Subscription;
  userId : string;

  dataSource : MatTableDataSource<any> = new MatTableDataSource();

  constructor(private orderService : OrderService, private authService : AuthService) { 
    this.subscription = this.authService.user$.pipe(switchMap(user => {
      return this.orderService.getOrdersByUserId(user.uid);
    })).subscribe(orders => {
      this.dataSource.data = orders;
    });
  }

  ngOnInit() {     
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

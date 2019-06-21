import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  orders : Order[];
  subscription : Subscription;
  dataSource : MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['name', 'datePlaced', 'details'];

  constructor(private orderService : OrderService) {
    this.subscription = this.orderService.getOrders().subscribe( orders => {
      this.orders=orders;
      this.dataSource.data = this.orders;
    });
   }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

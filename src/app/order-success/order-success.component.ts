import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { switchMap } from 'rxjs/operators';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orderId : string;
  order : Order;
  orderDate : Date;

  constructor(private route : ActivatedRoute, private orderService : OrderService) { 
    this.route.paramMap.pipe(switchMap(params => {
      this.orderId=params.params.id;
      return this.orderService.getOrder(this.orderId);
    })).subscribe(order => {
      this.order = order;
      this.orderDate = new Date(order.datePlaced);
    });
  }

  ngOnInit() {
  }

}

import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent  {

  @Input('shopping-cart') 
  shoppingCart : ShoppingCart;

  @Input('dataSource')
  dataSource : MatTableDataSource<any>;
 
  displayedColumns = ['title', 'price'] ;
  
  constructor() {  }

}

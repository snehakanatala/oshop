import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shoppingCart : ShoppingCart;
  subscription : Subscription;
  
  dataSource : MatTableDataSource<any> = new MatTableDataSource();

  constructor(private cartService : ShoppingCartService) {  }  

  async ngOnInit() {    
    const cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe(cart => {
      this.shoppingCart = cart;
      this.dataSource.data = this.shoppingCart.items;
    }); 
  }

  ngOnDestroy() {    
    this.subscription.unsubscribe();
  }
}

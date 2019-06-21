import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart : ShoppingCart = new ShoppingCart({});
  dataSource : MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['image', 'title', 'quantity', 'totalPrice'];

  constructor(private cartService : ShoppingCartService) { }

  async ngOnInit() {
    (await this.cartService.getCart()).subscribe(cart => {
      this.cart = cart;
      this.dataSource.data = Object.values(this.cart.items);
    });    
  }

  clearCart() {
    this.cartService.clearCart();
  }
}

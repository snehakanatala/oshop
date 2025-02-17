import { ShoppingCart } from './../../models/shopping-cart';
import { ShoppingCartService } from './../../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product : Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart : ShoppingCart;

  constructor(private cartService : ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}

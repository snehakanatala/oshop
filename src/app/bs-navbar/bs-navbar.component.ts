import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser$: Observable<AppUser>;
  cart$ : Observable<ShoppingCart>;

  constructor(private authService : AuthService, private cartService : ShoppingCartService) { 
    this.appUser$ = this.authService.appUser$;
  }

  logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());   
  }
}

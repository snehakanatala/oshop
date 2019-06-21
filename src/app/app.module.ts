import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { CustomFormsModule } from 'ng2-validation';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './products/product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { OrdersDisplayComponent } from './orders-display/orders-display.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    OrderSummaryComponent,
    ShippingFormComponent,
    OrdersDisplayComponent,
    OrderDetailsComponent
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatInputModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component : ProductsComponent },
      { path: 'shopping-cart', component : ShoppingCartComponent },
      { path: 'login', component : LoginComponent},
      { path: 'check-out', component: CheckOutComponent, canActivate : [AuthGuardService] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate : [AuthGuardService] },  
      { path: 'my-orders', component: MyOrdersComponent, canActivate : [AuthGuardService] },           
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate : [AuthGuardService, AdminAuthGuardService]},
      { path: 'admin/products/new', component: ProductFormComponent, canActivate : [AuthGuardService, AdminAuthGuardService]},
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate : [AuthGuardService, AdminAuthGuardService]},
      { path: 'admin/products', component: AdminProductsComponent, canActivate : [AuthGuardService, AdminAuthGuardService]},
      { path: 'orders/:id', component: OrderDetailsComponent, canActivate : [AuthGuardService] }

    ])

  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

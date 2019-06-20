import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { AngularFireList } from 'angularfire2/database';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  
  ngOnInit() {
  }

  categories;
  product = { payload : {}};
  id;

  constructor(
    private categoryService : CategoryService, 
    private productService : ProductService, 
    private router : Router,
    private route : ActivatedRoute) {
    categoryService.getCategories().subscribe(categories => this.categories=categories);
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) 
      this.productService.getProduct(this.id).valueChanges()
      .subscribe(product => {
        this.product = { payload :  product };
      });
  }

  save(product) {
    if(this.id) 
      this.productService.update(product, this.id);
    else 
      this.productService.create(product);
      
    this.router.navigate(['/admin/products']);
  }

  deleteProduct() {
    if(confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}

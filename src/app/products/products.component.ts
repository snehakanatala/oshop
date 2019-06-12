import { Category } from './../models/Category';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : any[];
  allProducts : Product[];
  allCategories : Category[];
  categoryKey : string;
  category : Category;
  filteredProducts : Product[];

  constructor(private productService : ProductService, private categoryService : CategoryService, private route : ActivatedRoute) { 
    this.productService.getAll().snapshotChanges()
    .pipe(switchMap(products => {
      this.products = products.map(pro => { return {
        key : pro.key,
        payload : pro.payload.val()
      }});
      this.filteredProducts = this.allProducts = this.products;
      return this.categoryService.getCategories();
    })).pipe(switchMap((categories: Category[]) => {
      this.allCategories = categories;
      return route.queryParamMap;
    })).subscribe(params => {
      this.categoryKey = params.get('category');
      if(this.categoryKey && this.allCategories) this.category = this.allCategories.find(c => c.key===this.categoryKey);
      if(this.categoryKey && this.allProducts) this.filteredProducts = this.allProducts.filter(p => p.payload.category.match(this.category.payload.name)) 
      else this.filteredProducts = this.allProducts;
    });        
  }

  ngOnInit() {
  }

}


// constructor(private productService : ProductService, private categoryService : CategoryService, private route : ActivatedRoute) { 
//   this.productService.getAll().snapshotChanges().subscribe(products => {
//     this.products = products.map(pro => { return {
//       key : pro.key,
//       payload : pro.payload.val()
//     }});
//     this.filteredProducts = this.allProducts = this.products;
//   });   

//   this.categoryService.getCategories().subscribe((categories: Category[]) => {
//     this.allCategories = categories;
//   });

//   route.queryParamMap.subscribe(params => {
//     this.categoryKey = params.get('category');
//     if(this.categoryKey && this.allCategories) this.category = this.allCategories.find(c => c.key===this.categoryKey);
//     if(this.categoryKey && this.allProducts) this.filteredProducts = this.allProducts.filter(p => p.payload.category.match(this.category.payload.name)) 
//     else this.filteredProducts = this.allProducts;
//   });    
// }
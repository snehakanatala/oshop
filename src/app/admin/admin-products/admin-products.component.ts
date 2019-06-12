import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  filProds : any[];
  products : Product[];
  subscription : Subscription;

  displayedColumns : string[] = ['title', 'price', 'category'];

  @ViewChild(MatPaginator) paginator : MatPaginator;

  @ViewChild(MatSort) sort : MatSort;

  dataSource: MatTableDataSource<any[]> = new MatTableDataSource();

  constructor(private productService : ProductService) { 
    this.subscription = this.productService.getAll().snapshotChanges()
      .subscribe(prods => {
        this.products = this.filProds = prods.map(pro => {          
          return { key : pro.key, payload : pro.payload.val()};
          });
        this.dataSource.data = this.filProds;
        return this.filProds;
      }); 
  }

  filter(query : string) {
    console.log(query);
    // this.dataSource.filter = query;
    this.filProds = (query) ? this.products.filter(p => p.payload.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : this.products;
    this.dataSource.data = this.filProds;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}


    // this.products$ = this.productService.getAll().snapshotChanges()
    //   .pipe(map(products => {
    //     return products
    //       .map(product => {
    //         return {
    //           key: product.key,
    //           payload: product.payload.val()
    //         };
    //       })
    //   }));
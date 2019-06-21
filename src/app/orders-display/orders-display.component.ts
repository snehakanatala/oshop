import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'orders-display',
  templateUrl: './orders-display.component.html',
  styleUrls: ['./orders-display.component.css']
})
export class OrdersDisplayComponent implements OnInit {

  @Input('dataSource')
  dataSource : MatTableDataSource<any>;

  displayedColumns = ['name', 'datePlaced', 'details'];
  
  constructor() { }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';
import { Category } from './models/Category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {}

  getCategories() : Observable<Category[]> {
    return this.db.list('/categories', order=>order.orderByChild('name'))
    .snapshotChanges().pipe(
      map((categories) => categories.map((category) => { return { key : category.key, payload : category.payload.val()} as Category; })))
  }

  getCategory(categoryKey) {
    return this.db.object('/categories/' + categoryKey);
  }
}

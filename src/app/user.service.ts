import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { defineBase } from '@angular/core/src/render3';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
import { AppErrorSne } from './AppErrorSne';
import { AppUser } from './models/app-user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db : AngularFireDatabase) {}

  save(user : firebase.User) {
    // console.log(user);
    this.db.object('/users/' + user.uid).update({
      name : user.displayName,
      email : user.email
    });    
  }

  get(uid : string) : Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
  }
}

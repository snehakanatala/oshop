import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './models/app-user';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ : Observable<firebase.User>;

  constructor(private userService : UserService, private afAuth : AngularFireAuth, private route : ActivatedRoute, private router : Router) {
    this.user$ = this.afAuth.authState;
   }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    returnUrl = !!returnUrl ? returnUrl : '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/');
  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(switchMap( user => {
      if(user) {
        return this.userService.get(user.uid);
      }
      return of(null);
    }));
  }

}

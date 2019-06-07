import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable, of, } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService : AuthService, private userService : UserService) {

  }

  canActivate() : Observable<boolean> {
   return this.authService.appUser$.pipe(map(appUser => appUser.isAdmin));
  }
}

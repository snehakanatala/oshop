import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService : AuthService, private router : Router) { }

  canActivate(route, state : RouterStateSnapshot): Observable<boolean> {
    
    return this.authService.user$.pipe(map(user => {
      if (user) return true;
      
      this.router.navigate(['/login'], {queryParams : { returnUrl: state.url }});
      return false;
    }));
  }

}

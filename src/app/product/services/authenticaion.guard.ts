import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
// import { ActivatedRouteSnapshot, RouteReuseStrategy, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticaionGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // state: RouterStateSnapshot
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (route.data['roles'][0] === 'user' && this.authService.isLoginSubject$.getValue()) {
      return  true
    }
    else {
      return this.router.createUrlTree(['signin'])
    }
  }

}

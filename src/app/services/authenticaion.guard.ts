import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
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

  canActivate() // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  :
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoginSubject$.getValue();
    // const d =  this.authService.isLoginSubject$.subscribe(e => {
    // 	console.log(e);
    // 	return true
    // 	// : this.router.createUrlTree(['signin'])
    // })
    // console.log(this.authService.isLoginSubject$.getValue());
    // if (this.authService.isLoginSubject$.getValue()) {
    // 	return true;
    // } else {
    // 	this.router.navigate(['/signin']);
    // 	return false;
    // }

    // return new Promise((resolve, reject) => {
    //   this.authService.isLoginSubject$.subscribe((user) => {
    //     // here we check if user is logged in or not
    //     // the authService returs user object, or
    //     // it returns undefined/null when user is not logged in
    //     if (!user) {
    //       // just return false - if user is not logged in
    // 			this.router.createUrlTree(['signin'])
    //       return resolve(false);
    //     } else {
    //       // just return true - if user is logged in
    //       return resolve(true);
    //     }
    //   });
    // });

    // this.authService.isLoggedIn().pipe(
    // 	map((e: boolean) => {
    // 		console.log(e);

    // 		if(e) {
    // 			// this.router.createUrlTree(['signin'])
    // 			return true
    // 		} else {

    // 			this.router.navigate(['/signin']);
    //       return false;

    // 		}
    // 		// return false
    // 	})
    // );
  }
}

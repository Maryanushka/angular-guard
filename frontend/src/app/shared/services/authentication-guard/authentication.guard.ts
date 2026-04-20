import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationGuard {
	private auth = inject(Auth);
	private router = inject(Router);

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
		return authState(this.auth).pipe(
			take(1),
			map((user) => {
				if (route.data['roles'][0] === 'user' && user) {
					return true;
				}
				return this.router.createUrlTree(['signin']);
			})
		);
	}
}

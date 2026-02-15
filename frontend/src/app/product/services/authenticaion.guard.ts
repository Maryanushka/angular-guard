import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MainFacade } from '../../shared/state/main-state/main.facade';

@Injectable({
	providedIn: 'root',
})
export class AuthenticaionGuard {
	private facade = inject(MainFacade);
	private router = inject(Router);

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
		return this.facade.isLoggedIn$.pipe(
			take(1),
			map(isLoggedIn => {
				if (route.data['roles'][0] === 'user' && isLoggedIn) {
					return true;
				}
				return this.router.createUrlTree(['signin']);
			})
		);
	}
}

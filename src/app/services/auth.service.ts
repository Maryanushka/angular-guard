import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { ErrorService } from '../shared/services/error.service';

import { IToken } from '../shared/types/token.interface';
import { IUserCredentials } from '../shared/types/userCredential.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
	isLoginSubject$ = new BehaviorSubject<boolean>(this.hasToken());
  constructor(
		private http: HttpClient,
		private errorService: ErrorService,
		private router: Router
	) { }

	getToken(userc: IUserCredentials) {
		this.http.post<IUserCredentials>(`https://api.escuelajs.co/api/v1/auth/login`, userc).pipe(
			catchError(this.handleError.bind(this))
		).subscribe((e) => {
			this.storeToStroage(e as unknown as IToken)
		})
	}

	storeToStroage(token: IToken) {
		localStorage.setItem('token', JSON.stringify(token));
		this.isLoginSubject$.next(true);
	}

	private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

	logout(): void {
		localStorage.removeItem('token');
		this.isLoginSubject$.next(false);
		this.router.navigate(['signin']);
	}

	isLoggedIn(): Observable<boolean> {
		return this.isLoginSubject$.asObservable();
	}
	
	private handleError(error: HttpErrorResponse) {
		this.errorService.handle(error.message)
		return throwError(() => error.message)
	}
}

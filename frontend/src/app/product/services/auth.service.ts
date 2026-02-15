import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { ErrorService } from '../../shared/services/error.service';
import { LocalStorageService } from '../../shared/services/localStorage.service';

import { IUserCredentials } from '../../shared/types/userCredential.interface';
import { Auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, deleteUser, signInWithPhoneNumber } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isLoginSubject$ = new BehaviorSubject<boolean>(this.hasToken());
	private authFirebase = inject(Auth);
	private storage = inject(LocalStorageService);

	// Modal State
	private _itemsInBasket = new BehaviorSubject<boolean>(false); // Reusing BehaviorSubject logic
	showAuthModal$ = new BehaviorSubject<boolean>(false);

	// Phone Auth
	confirmationResult: any;

	constructor(
		private http: HttpClient,
		private errorService: ErrorService,
		private router: Router
	) {}

	openAuthModal() {
		this.showAuthModal$.next(true);
	}

	closeAuthModal() {
		this.showAuthModal$.next(false);
	}

	async signInWithPhoneNumber(phoneNumber: string, appVerifier: any) {
		try {
			const result = await signInWithPhoneNumber(this.authFirebase, phoneNumber, appVerifier);
			this.confirmationResult = result;
			return result;
		} catch (error: any) {
			this.handleError(error.message);
			throw error;
		}
	}

	async verifyOtp(otp: string) {
		try {
			const result = await this.confirmationResult.confirm(otp);
			const user = result.user;
			this.storage.storeToStorage('token', user.accessToken);
			this.storage.storeToStorage('user', JSON.stringify(user));
			this.isLoginSubject$.next(true);
			this.closeAuthModal();
		} catch (error: any) {
			this.handleError(error.message);
			throw error;
		}
	}

	async getToken(userc: IUserCredentials | null, type: string) {
		if (type === 'form' && userc) {
			createUserWithEmailAndPassword(this.authFirebase, userc.email, userc.password)
				.then((userCredential: any) => {
					const user = userCredential.user;
					console.log(user.accessToken);
					this.storage.storeToStorage('token', user.accessToken);
					this.storage.storeToStorage('user', JSON.stringify(user));
					this.isLoginSubject$.next(true);
					this.closeAuthModal();
					this.router.navigate(['']);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					this.handleError(errorMessage);
				});
		} else if (type === 'google') {
			const provider = new GoogleAuthProvider();
			const user: any = await signInWithPopup(this.authFirebase, provider);
			console.log(user);
			this.storage.storeToStorage('token', user.accessToken);
			this.storage.storeToStorage('user', JSON.stringify(user));
			this.isLoginSubject$.next(true);
			this.closeAuthModal();
			this.router.navigate(['']);
		}
	}

	private hasToken(): boolean {
		return !!localStorage.getItem('token');
	}

	logout(): void {
		this.storage.removeFromStroage('token');
		const user = this.authFirebase.currentUser;
		if (user) {
			deleteUser(user)
				.then(() => {
					console.log('User deleted');
				})
				.catch((error) => {
					console.log(error);
				});
		}
		this.isLoginSubject$.next(false);
		this.router.navigate(['']);
	}

	isLoggedIn(): Observable<boolean> {
		return this.isLoginSubject$.asObservable();
	}

	private handleError(error: any) { // loosened type to handle firebase errors string/obj
		const message = error.message || error;
		this.errorService.handle(message);
		return throwError(() => message);
	}
}

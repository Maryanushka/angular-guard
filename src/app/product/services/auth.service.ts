import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { ErrorService } from '../../shared/services/error.service';
import { LocalStorageService } from '../../shared/services/localStorage.service';

import { IUserCredentials } from '../../shared/types/userCredential.interface';
import { Auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, deleteUser, } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoginSubject$ = new BehaviorSubject<boolean>(this.hasToken());
  private authFirebase = inject(Auth);
  private storage = inject(LocalStorageService);

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router,
  ) {}

  async getToken(userc: IUserCredentials | null, type: string) {
    if(type === 'form' && userc) {
      createUserWithEmailAndPassword(this.authFirebase, userc.email, userc.password)
      .then((userCredential:any) => {
        const user = userCredential.user;
        console.log(user.accessToken);
        this.storage.storeToStorage("token", user.accessToken);
        this.storage.storeToStorage("user", JSON.stringify(user));
        this.isLoginSubject$.next(true);
        this.router.navigate(['']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.handleError(errorMessage)
      });
    }
    else if (type === 'google') {
        const provider = new GoogleAuthProvider();
        const user: any = await signInWithPopup(this.authFirebase, provider);
        console.log(user);
        this.storage.storeToStorage("token", user.accessToken);
        this.storage.storeToStorage("user", JSON.stringify(user));
        this.isLoginSubject$.next(true);
        this.router.navigate(['']);
     }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    this.storage.removeFromStroage('token');
    const user = this.authFirebase.currentUser;
    if(user) {

      deleteUser(user).then(() => {
        console.log('User deleted');
      }).catch((error) => {
        console.log(error);
      });
    }
    this.isLoginSubject$.next(false);
    this.router.navigate(['']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject$.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}

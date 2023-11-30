import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../product/services/auth.service';
import { IUserCredentials } from '../shared/types/userCredential.interface';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup, signInAnonymously, createUserWithEmailAndPassword, } from '@angular/fire/auth';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SigninPageComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private authGoogle: Auth
  ) {}

  form = new FormGroup({
    email: new FormControl<string>('john@mail.com', [
      Validators.required,
      Validators.minLength(6),
    ]),
    // userName: new FormControl<string>('john', [
    //   Validators.required,
    //   Validators.minLength(2),
    // ]),
    password: new FormControl<string>('changeme', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get email() {
    return this.form.controls.email as FormControl;
  }
  get password() {
    return this.form.controls.password as FormControl;
  }

  submit() {
    console.log(this.form.value);

    // here send request to postman https://dummyjson.com/docs/auth
    // get token store to localstorage

    this.auth
      .getToken(this.form.value as IUserCredentials)
      .pipe(
        tap((e) => {
          console.log(e);

          this.router.navigate(['']);
        }),
      )
      .subscribe();
    if(this.form.value.email && this.form.value.password) {

      createUserWithEmailAndPassword(this.authGoogle, this.form.value.email, this.form.value.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

    // this.productService.createProduct({
    // 	title: this.form.value.title as string,
    // 	price: 13.5,
    // 	description: 'lorem ipsum set',
    // 	image: 'https://i.pravatar.cc',
    // 	category: 'electronic'
    // }).subscribe( () => {
    // 	this.notificationService.close()
    // })
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(this.authGoogle, provider);
    console.log(user);

    // await this.router.navigate(['']);
  }

}

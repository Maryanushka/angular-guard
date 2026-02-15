import { Injectable, inject } from '@angular/core';

import { Auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithPhoneNumber, updateProfile, signOut } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private authFirebase = inject(Auth);

	// Phone Auth
	confirmationResult: any;

	async signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(this.authFirebase, provider);
	}

	async signInWithEmail(email: string, password: string) {
		return createUserWithEmailAndPassword(this.authFirebase, email, password);
	}

	async registerUser(name: string, email: string, password: string) {
		const userCredential = await createUserWithEmailAndPassword(this.authFirebase, email, password);
		await updateProfile(userCredential.user, { displayName: name });
		return userCredential;
	}

	async startPhoneSignIn(phoneNumber: string, appVerifier: any) {
		const result = await signInWithPhoneNumber(this.authFirebase, phoneNumber, appVerifier);
		this.confirmationResult = result;
		return result;
	}

	async verifyOtp(otp: string) {
		return this.confirmationResult.confirm(otp);
	}

	async signOut() {
		return signOut(this.authFirebase);
	}
}

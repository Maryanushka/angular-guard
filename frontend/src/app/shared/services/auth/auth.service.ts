import { Injectable, inject } from '@angular/core';
import {
	Auth,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithPhoneNumber,
	updateProfile,
	signOut,
	verifyBeforeUpdateEmail,
	sendPasswordResetEmail,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc, getDoc } from 'firebase/firestore';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private authFirebase = inject(Auth);
	private firestore = inject(Firestore);

	// Phone Auth
	confirmationResult: any;

	async signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(this.authFirebase, provider);

		// Check if user document exists, if not create it
		const user = result.user;
		const userDocRef = doc(this.firestore, 'users', user.uid);
		const snapshot = await getDoc(userDocRef);

		if (!snapshot.exists()) {
			await setDoc(userDocRef, {
				uid: user.uid,
				name: user.displayName || 'User',
				email: user.email,
				profile: {
					name: user.displayName || 'User',
					email: user.email,
					phone: '',
					pdfUrls: [],
				},
				createdAt: new Date(),
			});
		}

		return result;
	}

	async signInWithEmail(email: string, password: string) {
		return createUserWithEmailAndPassword(this.authFirebase, email, password);
	}

	async registerUser(name: string, email: string, password: string) {
		const userCredential = await createUserWithEmailAndPassword(this.authFirebase, email, password);
		await updateProfile(userCredential.user, { displayName: name });

		// Create user document in Firestore using UID as document ID
		await setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
			uid: userCredential.user.uid,
			name,
			email,
			profile: {
				name,
				email,
				phone: '',
				pdfUrls: [],
			},
			createdAt: new Date(),
		});

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

	async updateUserEmail(newEmail: string) {
		const user = this.authFirebase.currentUser;
		if (user) {
			return verifyBeforeUpdateEmail(user, newEmail);
		}
		throw new Error('No user is currently logged in');
	}

	async resetPassword(email: string) {
		sendPasswordResetEmail(this.authFirebase, email);
	}
}

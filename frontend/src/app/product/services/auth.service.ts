import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithPhoneNumber, updateProfile, signOut, verifyBeforeUpdateEmail } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
		// Check if user document exists, if not create it (this part could also be in an effect)
		return result;
	}

	async signInWithEmail(email: string, password: string) {
		return createUserWithEmailAndPassword(this.authFirebase, email, password);
	}

	async registerUser(name: string, email: string, password: string) {
		const userCredential = await createUserWithEmailAndPassword(this.authFirebase, email, password);
		await updateProfile(userCredential.user, { displayName: name });

		// Create user document in Firestore with auto-generated ID
		// We store the uid as a field to link with Auth
		await addDoc(collection(this.firestore, 'users'), {
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
}

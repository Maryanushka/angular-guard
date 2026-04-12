import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';

export interface UploadProgress {
	progress: number;
	downloadUrl?: string;
}

@Injectable({
	providedIn: 'root',
})
export class FileUploadService {
	private storage = inject(Storage);
	private firestore = inject(Firestore);
	private injector = inject(Injector);

	uploadFile(uid: string, file: File): Observable<UploadProgress> {
		const subject = new Subject<UploadProgress>();
		const timestamp = Date.now();
		const filePath = `users/${uid}/files/${timestamp}_${file.name}`;

		// Wrap Firebase Storage calls inside injection context
		runInInjectionContext(this.injector, () => {
			const storageRef = ref(this.storage, filePath);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					subject.next({ progress });
				},
				(error) => {
					subject.error(error);
				},
				() => {
					// Completion callback also needs injection context
					runInInjectionContext(this.injector, async () => {
						try {
							const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

							// Append to user's pdfUrls in Firestore
							const userDocRef = doc(this.firestore, 'users', uid);
							await updateDoc(userDocRef, {
								'profile.pdfUrls': arrayUnion(downloadUrl),
							});

							subject.next({ progress: 100, downloadUrl });
							subject.complete();
						} catch (error) {
							subject.error(error);
						}
					});
				}
			);
		});

		return subject.asObservable();
	}

	async deleteFile(uid: string, fileUrl: string): Promise<void> {
		return runInInjectionContext(this.injector, async () => {
			// Delete from Firebase Storage
			const storageRef = ref(this.storage, fileUrl);
			await deleteObject(storageRef);

			// Remove URL from Firestore
			const userDocRef = doc(this.firestore, 'users', uid);
			await updateDoc(userDocRef, {
				'profile.pdfUrls': arrayRemove(fileUrl),
			});
		});
	}
}

import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment';

export interface UploadProgress {
	progress: number;
	downloadUrl?: string;
	fileName?: string;
}

@Injectable({
	providedIn: 'root',
})
export class FileUploadService {
	private http = inject(HttpClient);
	private firestore = inject(Firestore);
	private injector = inject(Injector);
	private messageService = inject(MessageService);

	uploadFile(uid: string, file: File, folderName: string): Observable<UploadProgress> {
		const subject = new Subject<UploadProgress>();

		this.convertFileToBase64(file)
			.then((base64Data) => {
				const payload = {
					action: 'upload',
					uid: uid,
					folderName: folderName,
					name: file.name,
					mimeType: file.type,
					base64: base64Data,
					secretKey: environment.gasSecretKey,
				};

				subject.next({ progress: 10 });

				this.http
					.post(environment.googleDriveUploadUrl, JSON.stringify(payload), {
						headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=utf-8' }),
						responseType: 'text',
					})
					.subscribe({
						next: (event) => {
							subject.next({ progress: 99 });

							try {
								const responseData = JSON.parse(event as string);
								if (responseData.success && responseData.downloadUrl) {
									const downloadUrl = responseData.downloadUrl;

									runInInjectionContext(this.injector, async () => {
										try {
											const userDocRef = doc(this.firestore, 'users', uid);
											await updateDoc(userDocRef, {
												'profile.documents': arrayUnion({ name: file.name, url: downloadUrl }),
											});
											this.messageService.add({
												severity: 'success',
												summary: 'Success',
												detail: 'File uploaded successfully',
											});
											subject.next({ progress: 100, downloadUrl, fileName: file.name });
											subject.complete();
										} catch (error) {
											this.messageService.add({
												severity: 'error',
												summary: 'Error',
												detail: 'Failed to update user profile',
											});
											subject.error(error);
										}
									});
								} else {
									this.messageService.add({
										severity: 'error',
										summary: 'Error',
										detail: 'Upload failed: ' + responseData.error,
									});
									subject.error('Upload failed: ' + responseData.error);
								}
							} catch (e) {
								this.messageService.add({
									severity: 'error',
									summary: 'Error',
									detail: 'Failed to parse upload response',
								});
								subject.error('Failed to parse upload response.');
							}
						},
						error: (err) => {
							this.messageService.add({
								severity: 'error',
								summary: 'Error',
								detail: 'Network error during upload',
							});
							subject.error(err);
						},
					});
			})
			.catch((err) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'Failed to prepare file for upload',
				});
				subject.error(err);
			});

		return subject.asObservable();
	}

	private convertFileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const result = reader.result as string;
				const base64Raw = result.split(',')[1];
				resolve(base64Raw);
			};
			reader.onerror = (error) => reject(error);
		});
	}

	async deleteFile(uid: string, document: { name: string; url: string }): Promise<void> {
		try {
			const payload = {
				action: 'delete',
				fileUrl: document.url,
				secretKey: environment.gasSecretKey,
			};

			const response: string = await firstValueFrom(
				this.http.post(environment.googleDriveUploadUrl, JSON.stringify(payload), {
					headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=utf-8' }),
					responseType: 'text',
				})
			);
			const parsed = JSON.parse(response);
			if (!parsed.success) {
				throw new Error(parsed.error);
			}

			return runInInjectionContext(this.injector, async () => {
				const userDocRef = doc(this.firestore, 'users', uid);
				await updateDoc(userDocRef, {
					'profile.documents': arrayRemove(document),
				});
				this.messageService.add({
					severity: 'success',
					summary: 'Success',
					detail: 'File deleted safely',
				});
			});
		} catch (error) {
			this.messageService.add({
				severity: 'error',
				summary: 'Error',
				detail: 'Failed to delete file',
			});
			throw error;
		}
	}
}

import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment';

export interface UploadProgress {
	progress: number;
	downloadUrl?: string;
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

				// Browsers force an OPTIONS preflight if XHR upload progress listeners are registered.
				// Since Google Apps Script completely breaks on OPTIONS preflight redirects, we must NOT use reportProgress.

				// Fake a starting progress so UI shows loading state
				subject.next({ progress: 10 });

				// Standard POST request (No preflight)
				this.http
					.post(environment.googleDriveUploadUrl, JSON.stringify(payload), {
						headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=utf-8' }),
						responseType: 'text',
					})
					.subscribe({
						next: (event) => {
							// Jump to 99% progress when done
							subject.next({ progress: 99 });

							try {
								const responseData = JSON.parse(event as string);
								if (responseData.success && responseData.downloadUrl) {
									const downloadUrl = responseData.downloadUrl;

									// Append to user's pdfUrls in Firestore
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
											subject.next({ progress: 100, downloadUrl });
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
				// Remove the 'data:application/pdf;base64,' prefix
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

			// Send delete request to Apps Script
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

			// Remove document from Firestore
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

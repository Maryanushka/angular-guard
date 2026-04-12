import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { UserFacade, AuthFacade, TranslatePipe } from '@shared';
import { take } from 'rxjs/operators';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = '.pdf,.png,.jpg,.jpeg,.webp';

@Component({
	selector: 'app-file-upload',
	standalone: true,
	imports: [CommonModule, FileUploadModule, ButtonModule, ProgressBarModule, TooltipModule, TranslatePipe],
	templateUrl: './file-upload.component.html',
	styles: [
		`
			:host {
				display: block;
			}

			.file-list-item {
				transition: all 0.2s ease;
			}

			.file-list-item:hover {
				background-color: rgba(0, 0, 0, 0.02);
			}

			.drop-zone {
				border: 2px dashed #d1d5db;
				border-radius: 12px;
				transition: all 0.3s ease;
				cursor: pointer;
			}

			.drop-zone:hover {
				border-color: var(--p-primary-color);
				background-color: rgba(var(--p-primary-color-rgb), 0.04);
			}
		`,
	],
})
export class FileUploadComponent implements OnInit {
	private userFacade = inject(UserFacade);
	private authFacade = inject(AuthFacade);

	files$ = this.userFacade.files$;
	uploading$ = this.userFacade.uploading$;

	private currentUid: string | null = null;

	readonly maxFileSize = MAX_FILE_SIZE;
	readonly acceptedTypes = ACCEPTED_TYPES;

	ngOnInit() {
		this.authFacade.user$.pipe(take(1)).subscribe((user) => {
			this.currentUid = user?.uid ?? null;
		});
	}

	onFileSelect(event: any) {
		const files: File[] = event.files || event.currentFiles;
		if (!files?.length || !this.currentUid) return;

		for (const file of files) {
			this.userFacade.uploadFile(this.currentUid, file);
		}
	}

	deleteFile(fileUrl: string) {
		if (!this.currentUid) return;
		this.userFacade.deleteFile(this.currentUid, fileUrl);
	}

	getFileName(url: string): string {
		try {
			// Firebase Storage URLs encode the path — extract the filename
			const decodedUrl = decodeURIComponent(url);
			const pathPart = decodedUrl.split('/o/')[1]?.split('?')[0] || '';
			const segments = pathPart.split('/');
			const fullName = segments[segments.length - 1] || 'Unknown file';
			// Remove the timestamp prefix (e.g. "1712956800000_document.pdf" → "document.pdf")
			const underscoreIndex = fullName.indexOf('_');
			return underscoreIndex > 0 ? fullName.substring(underscoreIndex + 1) : fullName;
		} catch {
			return 'Unknown file';
		}
	}

	getFileIcon(url: string): string {
		const name = this.getFileName(url).toLowerCase();
		if (name.endsWith('.pdf')) return 'pi pi-file-pdf';
		if (name.match(/\.(png|jpg|jpeg|webp|gif)$/)) return 'pi pi-image';
		return 'pi pi-file';
	}

	isPdfFile(url: string): boolean {
		return this.getFileName(url).toLowerCase().endsWith('.pdf');
	}

	isImageFile(url: string): boolean {
		return !!this.getFileName(url)
			.toLowerCase()
			.match(/\.(png|jpg|jpeg|webp|gif)$/);
	}
}

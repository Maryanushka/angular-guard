import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { UserFacade, AuthFacade, TranslatePipe } from '@shared';
import { map, take } from 'rxjs/operators';

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

	documents$ = this.userFacade.documents$;
	uploading$ = this.userFacade.uploading$;

	private currentUid: string | null = null;
	private currentProfileName = '';

	readonly maxFileSize = MAX_FILE_SIZE;
	readonly acceptedTypes = ACCEPTED_TYPES;

	ngOnInit() {
		this.authFacade.user$.pipe(take(1)).subscribe((user) => {
			this.currentUid = user?.uid ?? null;
		});
		this.userFacade.profile$.pipe(take(1)).subscribe((profile) => {
			this.currentProfileName = profile?.name ?? 'User';
		});
	}

	onFileSelect(event: { files?: File[]; currentFiles?: File[] }) {
		const files: File[] = event.files || event.currentFiles || [];
		if (!files?.length || !this.currentUid) return;

		const folderName = `${this.currentProfileName.replace(/\s+/g, '_')}_${this.currentUid}`;

		for (const file of files) {
			this.userFacade.uploadFile(this.currentUid, file, folderName);
		}
	}

	deleteFile(document: { name: string; url: string }) {
		if (!this.currentUid) return;
		this.userFacade.deleteFile(this.currentUid, document);
	}

	getFileIcon(name: string): string {
		const lowerName = name.toLowerCase();
		if (lowerName.endsWith('.pdf')) return 'pi pi-file-pdf';
		if (lowerName.match(/\.(png|jpg|jpeg|webp|gif)$/)) return 'pi pi-image';
		return 'pi pi-file';
	}

	isPdfFile(name: string): boolean {
		return name.toLowerCase().endsWith('.pdf');
	}

	isImageFile(name: string): boolean {
		return !!name.toLowerCase().match(/\.(png|jpg|jpeg|webp|gif)$/);
	}
}

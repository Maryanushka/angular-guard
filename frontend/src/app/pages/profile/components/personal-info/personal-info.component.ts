import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { UserFacade, AuthFacade } from '@shared';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { TranslatePipe, TRANSLATIONS } from '@shared';

@Component({
	selector: 'app-personal-info',
	standalone: true,
	imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, TableModule, TooltipModule, TranslatePipe],
	templateUrl: './personal-info.component.html',
})
export class PersonalInfoComponent implements OnInit {
	private userFacade = inject(UserFacade);
	private authFacade = inject(AuthFacade);

	user$ = this.authFacade.user$;
	loading$ = this.userFacade.loading$;
	profile$ = this.userFacade.profile$;
	documents$ = this.userFacade.documents$;

	private currentUid: string | null = null;

	// Combine data for p-table
	fields$ = combineLatest([this.user$, this.profile$]).pipe(
		map(([user, profile]) => [
			{ label: 'COMMON.LABELS.FULL_NAME', value: profile?.name || user?.displayName || TRANSLATIONS.COMMON.MESSAGES.NA, editable: true, field: 'name' },
			{ label: 'COMMON.LABELS.EMAIL', value: user?.email || '', editable: true, field: 'email' },
			{ label: 'COMMON.LABELS.PHONE', value: profile?.phone || TRANSLATIONS.COMMON.MESSAGES.NOT_PROVIDED, editable: true, field: 'phone' },
		])
	);

	ngOnInit() {
		this.authFacade.user$.pipe(take(1)).subscribe((user) => {
			this.currentUid = user?.uid ?? null;
		});
	}

	deleteFile(document: { name: string; url: string }) {
		if (!this.currentUid) return;
		this.userFacade.deleteFile(this.currentUid, document);
	}

	getFileIcon(name: string): string {
		const lowerName = (name || '').toLowerCase();
		if (lowerName.endsWith('.pdf')) return 'pi pi-file-pdf';
		if (lowerName.match(/\.(png|jpg|jpeg|webp|gif)$/)) return 'pi pi-image';
		return 'pi pi-file';
	}

	onEditComplete(event: any) {
		const field = event.data.field;
		const newValue = event.data.value;

		if (field === 'email') {
			this.user$.pipe(take(1)).subscribe((user) => {
				if (newValue && newValue !== user?.email) {
					this.authFacade.updateEmail(newValue);
				}
			});
		} else if (field === 'name' || field === 'phone') {
			this.user$.pipe(take(1)).subscribe((user) => {
				if (user?.uid) {
					this.profile$.pipe(take(1)).subscribe((currentProfile) => {
						const update: any = {};
						if (field === 'name') update.name = newValue;
						if (field === 'phone') update.phone = newValue;

						const updatedProfile = {
							...(currentProfile || {}),
							...update,
							email: user.email || currentProfile?.email || '',
						};

						this.userFacade.updateProfile(user.uid, updatedProfile);
					});
				}
			});
		}
	}
}

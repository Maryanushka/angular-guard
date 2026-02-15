import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UserFacade, AuthFacade } from '@shared';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
	selector: 'app-personal-info',
	standalone: true,
	imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, TableModule],
	templateUrl: './personal-info.component.html',
})
export class PersonalInfoComponent implements OnInit {
	private userFacade = inject(UserFacade);
	private authFacade = inject(AuthFacade);

	user$ = this.authFacade.user$;
	loading$ = this.userFacade.loading$;
	profile$ = this.userFacade.profile$;

	// Combine data for p-table
	fields$ = combineLatest([this.user$, this.profile$]).pipe(
		map(([user, profile]) => [
			{ label: 'Full Name', value: user?.displayName || 'N/A', editable: false },
			{ label: 'Email Address', value: user?.email || '', editable: true, field: 'email' },
			{ label: 'Phone Number', value: profile?.phone || 'Not provided', editable: false },
		])
	);

	ngOnInit() {}

	onEditComplete(event: any) {
		if (event.field === 'value' && event.data.field === 'email') {
			const newEmail = event.data.value;
			this.user$.pipe(take(1)).subscribe((user) => {
				if (newEmail && newEmail !== user?.email) {
					this.authFacade.updateEmail(newEmail);
				}
			});
		}
	}
}

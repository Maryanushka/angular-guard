import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { AuthFacade, UserFacade, NavigationComponent, FooterComponent } from '@shared';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ButtonModule } from 'primeng/button';
import { take } from 'rxjs';
import { TranslatePipe } from '@shared';

@Component({
	selector: 'app-profile-page',
	standalone: true,
	imports: [CommonModule, TabsModule, PersonalInfoComponent, OrderHistoryComponent, NavigationComponent, FooterComponent, ButtonModule, TranslatePipe],
	templateUrl: './profile-page.component.html',
	styles: [
		`
			:host ::ng-deep .p-tabs {
				@apply w-full;
			}
		`,
	],
})
export class ProfilePageComponent implements OnInit {
	private authFacade = inject(AuthFacade);
	private userFacade = inject(UserFacade);

	user$ = this.authFacade.user$;

	ngOnInit() {
		this.user$.pipe(take(1)).subscribe((user) => {
			if (user?.uid) {
				this.userFacade.loadProfile(user.uid);
			}
		});
	}

	logout() {
		this.authFacade.logout();
	}
}

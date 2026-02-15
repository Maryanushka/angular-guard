import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { AuthFacade } from '../shared/state/auth-state/auth.facade';
import { UserFacade } from '../shared/state/user-state/user.facade';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { take } from 'rxjs';

@Component({
	selector: 'app-profile-page',
	standalone: true,
	imports: [CommonModule, TabsModule, PersonalInfoComponent, OrderHistoryComponent, NavigationComponent, FooterComponent],
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
}

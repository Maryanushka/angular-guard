import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MainFacade } from '../../state/main-state/main.facade';
import { AuthFacade } from '../../state/auth-state/auth.facade';
import { BasketComponent } from '../basket/basket.component';
import { ButtonModule } from 'primeng/button';
import { take } from 'rxjs';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	standalone: true,
	imports: [CommonModule, RouterModule, BasketComponent, ButtonModule],
})
export class NavigationComponent implements OnInit {
	isHome = false;
	isMenuOpen = false;
	private router = inject(Router);
	private facade = inject(MainFacade);
	private authFacade = inject(AuthFacade);

	ngOnInit() {
		this.isHome = this.router.url === '/';
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
		if (this.isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	closeMenu() {
		this.isMenuOpen = false;
		document.body.style.overflow = '';
	}

	onUserIconClick() {
		this.authFacade.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
			if (isLoggedIn) {
				this.router.navigate(['/profile']);
			} else {
				this.authFacade.openAuthModal();
			}
		});
	}
}

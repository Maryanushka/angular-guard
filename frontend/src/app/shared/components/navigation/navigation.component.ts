import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MainFacade } from '../../state/main-state/main.facade';
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
	router = inject(Router);
	private facade = inject(MainFacade);

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
		this.facade.isLoggedIn$.pipe(take(1)).subscribe(isLoggedIn => {
			if (isLoggedIn) {
				this.router.navigate(['/profile']);
				this.closeMenu();
			} else {
				this.facade.openAuthModal();
				this.closeMenu();
			}
		});
	}
}

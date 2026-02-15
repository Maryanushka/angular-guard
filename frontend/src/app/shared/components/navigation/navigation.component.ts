import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../product/services/auth.service';
import { BasketComponent } from '../basket/basket.component';
import { ButtonModule } from 'primeng/button';

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
	authService = inject(AuthService);

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
		// We can subscribe to isLoggedIn check or check current value if it's behavior subject
		// For now simple check via service
		// In AuthService we have isLoggedIn observable. 
		// Let's modify logic: if generic user -> modal.
		
		// The isLoginSubject$ is public in AuthService.
		const isLoggedIn = this.authService.isLoginSubject$.value;
		if (isLoggedIn) {
			this.router.navigate(['/profile']); // Navigate to profile if logged in
			this.closeMenu();
		} else {
			this.authService.openAuthModal();
			this.closeMenu();
		}
	}
}

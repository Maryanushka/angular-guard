import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../product/services/auth.service';
import { BasketComponent } from '../basket/basket.component';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	standalone: true,
	imports: [CommonModule, RouterModule, BasketComponent],
	providers: [AuthService],
})
export class NavigationComponent implements OnInit {
	isHome = false;
	router = inject(Router);

	ngOnInit() {
		this.isHome = this.router.url === '/';
	}
}

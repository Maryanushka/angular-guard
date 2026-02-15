import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent, NavigationComponent } from '@shared';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, NavigationComponent, SocialMediaComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {}

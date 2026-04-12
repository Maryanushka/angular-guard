import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SignInComponent, NavigationComponent, FooterComponent } from '@shared';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
	selector: 'app-signin-page',
	standalone: true,
	imports: [CommonModule, CardModule, SignInComponent, NavigationComponent, FooterComponent, TranslatePipe],
	templateUrl: './signin-page.component.html',
})
export class SigninPageComponent {}

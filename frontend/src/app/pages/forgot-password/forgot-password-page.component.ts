import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ForgotPasswordComponent, NavigationComponent, FooterComponent } from '@shared';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
	selector: 'app-forgot-password-page',
	standalone: true,
	imports: [CommonModule, CardModule, ForgotPasswordComponent, NavigationComponent, FooterComponent, TranslatePipe],
	templateUrl: './forgot-password-page.component.html',
})
export class ForgotPasswordPageComponent {}

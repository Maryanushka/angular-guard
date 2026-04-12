import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RegisterComponent, NavigationComponent, FooterComponent } from '@shared';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
	selector: 'app-register-page',
	standalone: true,
	imports: [CommonModule, CardModule, RegisterComponent, NavigationComponent, FooterComponent, TranslatePipe],
	templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {}

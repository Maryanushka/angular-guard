import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AuthDialogComponent } from './shared/components/auth/auth-dialog.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [CommonModule, RouterModule, AuthDialogComponent, ToastModule],
})
export class AppComponent {}

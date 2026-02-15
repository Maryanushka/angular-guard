import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MainFacade } from '../shared/state/main-state/main.facade';

@Component({
	selector: 'app-signin-page',
	templateUrl: './signin-page.component.html',
	styleUrls: ['./signin-page.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, NavigationComponent, FooterComponent],
})
export class SigninPageComponent {
	private facade = inject(MainFacade);

	form = new FormGroup({
		email: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
		password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
	});

	get email() {
		return this.form.controls.email as FormControl;
	}
	get password() {
		return this.form.controls.password as FormControl;
	}

	submit() {
		if (this.form.valid) {
			this.facade.loginEmail(this.form.value.email!, this.form.value.password!);
		}
	}

	loginWithGoogle() {
		this.facade.loginGoogle();
	}
}

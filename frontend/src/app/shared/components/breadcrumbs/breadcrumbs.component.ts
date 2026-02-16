import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
	selector: 'app-breadcrumbs',
	standalone: true,
	imports: [CommonModule, RouterModule, TranslatePipe],
	templateUrl: './breadcrumbs.component.html',
	styleUrl: './breadcrumbs.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
	title = input.required<string>();
}

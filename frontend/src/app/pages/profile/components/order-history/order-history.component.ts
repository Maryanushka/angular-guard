import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { UserFacade } from '@shared';

@Component({
	selector: 'app-order-history',
	standalone: true,
	imports: [CommonModule, TableModule],
	templateUrl: './order-history.component.html',
})
export class OrderHistoryComponent {
	private userFacade = inject(UserFacade);
	orders$ = this.userFacade.orders$;
	loading$ = this.userFacade.loading$;
}

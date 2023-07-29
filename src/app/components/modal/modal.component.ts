import { Component, Input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

	@Input() title = ''

	constructor(public notificationService: NotificationService) {}

}

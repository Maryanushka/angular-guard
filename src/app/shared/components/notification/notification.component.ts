import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

	@Input() title = ''

	constructor(public notificationService: NotificationService) {}

	ngOnInit(): void {
    // Assuming you want to hide the modal after 2000ms (2 seconds)
    this.hideModalAfterDelay();
  }

  hideModalAfterDelay(): void {
    this.notificationService.isNotification$.pipe(
      delay(2000),
      tap(() => this.notificationService.isNotification$.next(false))
    ).subscribe();
  }
	
}

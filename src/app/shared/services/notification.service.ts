import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

	isNotification$ = new BehaviorSubject<boolean>(false)

	open() {
		this.isNotification$.next(true)
	}
	close() {
		this.isNotification$.next(false)
	}
}

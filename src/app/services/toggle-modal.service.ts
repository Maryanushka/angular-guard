import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleModalService {

	isModalVisible$ = new BehaviorSubject<boolean>(false)
  constructor() { }

	open() {
		this.isModalVisible$.next(true)
	}
	close() {
		this.isModalVisible$.next(false)
	}
}

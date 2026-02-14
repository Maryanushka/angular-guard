import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	storeToStorage(name: string, value: string) {
		localStorage.setItem(name, JSON.stringify(value));
	}
	removeFromStroage(name: string) {
		localStorage.removeItem(name);
	}
	getFromStroage(name: string) {
		localStorage.getItem(name);
	}
}

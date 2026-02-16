import { Injectable } from '@angular/core';
import { TRANSLATIONS } from '../i18n/translations';

@Injectable({
	providedIn: 'root',
})
export class TranslateService {
	get(key: string): string {
		const keys = key.split('.');
		let result: any = TRANSLATIONS;

		for (const k of keys) {
			if (result && typeof result === 'object' && k in result) {
				result = result[k];
			} else {
				return key;
			}
		}

		return typeof result === 'string' ? result : key;
	}
}

import { Pipe, PipeTransform } from '@angular/core';
import { TRANSLATIONS } from '../i18n/translations';

@Pipe({
	name: 'translate',
	standalone: true,
})
export class TranslatePipe implements PipeTransform {
	transform(value: string): string {
		const keys = value.split('.');
		let result: any = TRANSLATIONS;

		for (const key of keys) {
			if (result && typeof result === 'object' && key in result) {
				result = result[key];
			} else {
				return value; // Return original key if not found
			}
		}

		return typeof result === 'string' ? result : value;
	}
}

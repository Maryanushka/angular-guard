import { inject, Injectable } from '@angular/core';
import imageUrlBuilder from '@sanity/image-url';
import { SANITY_CLIENT } from './sanity-client.token';

@Injectable({
	providedIn: 'root',
})
export class SanityImageService {
	private client = inject(SANITY_CLIENT);
	private builder = imageUrlBuilder(this.client);

	/**
	 * Returns an image builder for the given source (e.g. product.cover)
	 * @param source Sanity image source
	 * @returns ImageUrlBuilder
	 */
	getImageBuilder(source: any) {
		return this.builder.image(source);
	}

	/**
	 * Convenience method to get a resized image URL
	 * @param source Sanity image source
	 * @param width desired width
	 * @param height optional height
	 * @returns string URL
	 */
	getResizedUrl(source: any, width: number, height?: number) {
		let b = this.getImageBuilder(source).width(width).auto('format');
		if (height) {
			b = b.height(height);
		}
		return b.url();
	}
}

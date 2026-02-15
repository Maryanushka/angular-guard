import { inject, Injectable } from '@angular/core';
import { ICategory, IProduct, ISingleProduct } from '../../types/product.inteface';
import { delay, from, Observable, retry } from 'rxjs';
import { map } from 'rxjs/operators';
import { SANITY_CLIENT } from '../../services/sanity-client.token';
import groq from 'groq';
@Injectable({
	providedIn: 'root',
})
export class GetProductService {
	private sanity = inject(SANITY_CLIENT);

	getProducts(category?: string | null, limit?: number, offset = 0, end = 0): Observable<IProduct[]> {
		const query = groq`*[_type == "product" && (!defined($category) || $category == "" || (defined(tag) && $category in tag))] | order(_createdAt desc)[$offset...$end]{
      "_slug": slug.current,
      title,
      description,
      "cover": metaImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
      "categories": coalesce(categories[]->{"_slug": slug.current, title}, []),
      tag,
      price
    }`;
		const limitVal = limit ?? 20;
		const params = { category: category ?? null, offset, end: offset + limitVal };
		return from(this.sanity.fetch<IProduct[]>(query, params)).pipe(retry(2), delay(200));
	}

	getProductCount(category?: string | null): Observable<number> {
		const query = groq`count(*[_type == "product" && (!defined($category) || $category == "" || (defined(tag) && $category in tag))])`;
		const params = { category: category ?? null };
		return from(this.sanity.fetch<number>(query, params)).pipe(retry(2), delay(100));
	}

	getSingleProduct(slug: string): Observable<ISingleProduct> {
		const query = groq`*[_type == "product" && slug.current == $slug][0]{
      "_slug": slug.current,
      title,
      "description": pt::text(description),
      price,
      "cover": select(defined(metaImage.asset) => [metaImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height}], []),
      "categories": coalesce(categories[]->{"_slug": slug.current, title}, []),
      "content": [{"body": pt::text(description)}],
      "seo": select(defined(seo) => {
        "title": seo.metaTitle,
        "description": seo.metaDescription,
        "social_media_image": seo.metaImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height}
      }, null),
      "tabs": coalesce(sections[_type == "productTabs"][0].tabs[] { label, "content": pt::text(content) }, []),
      "video": select(defined(sections[_type == "youtube"][0].youtube_id) => {
        "embedUrl": "https://www.youtube.com/embed/" + sections[_type == "youtube"][0].youtube_id,
        "posterUrl": "https://img.youtube.com/vi/" + sections[_type == "youtube"][0].youtube_id + "/hqdefault.jpg"
      }, null)
    }`;
		return from(this.sanity.fetch<ISingleProduct | null>(query, { slug })).pipe(
			retry(2),
			delay(200),
			map((product) => product ?? ({} as ISingleProduct))
		);
	}

	getCategories(): Observable<ICategory[]> {
		const query = groq`*[_type == "categories"][0].category_list[]{
      title,
      tag
    }`;
		return from(this.sanity.fetch<ICategory[]>(query)).pipe(retry(2), delay(200));
	}
}

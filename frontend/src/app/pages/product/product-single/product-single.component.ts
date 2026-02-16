import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
	toIProduct,
	ISingleProduct,
	SanityImageService,
	MainFacade,
	NavigationComponent,
	TabsComponent,
	VideoPlayerComponent,
	SocialMediaComponent,
	FooterComponent,
	BreadcrumbsComponent,
	TranslatePipe,
	TranslateService,
} from '@shared';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-product-single',
	templateUrl: './product-single.component.html',
	styleUrls: ['./product-single.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		VideoPlayerComponent,
		TabsComponent,
		SocialMediaComponent,
		NavigationComponent,
		FooterComponent,
		RouterModule,
		ButtonModule,
		BreadcrumbsComponent,
		ToastModule,
		TranslatePipe,
	],
})
export class ProductSingleComponent implements OnInit, OnDestroy {
	private facade = inject(MainFacade);
	private activatedRoute = inject(ActivatedRoute);
	private messageService = inject(MessageService);
	private translate = inject(TranslateService);
	private querySubscription = new Subscription();

	singleProduct$ = this.facade.singleProduct$;
	singleProductLoading$ = this.facade.singleProductLoading$;
	singleProductError$ = this.facade.singleProductError$;

	ngOnInit() {
		this.querySubscription = this.activatedRoute.params.subscribe((params) => {
			this.facade.loadSingleProduct(params['slug']);
		});
	}

	ngOnDestroy() {
		this.querySubscription.unsubscribe();
	}

	private sanityImage = inject(SanityImageService);

	getImageUrl(cover: any): string {
		return this.sanityImage.getResizedUrl(cover, 800);
	}

	addToBasket(product: ISingleProduct): void {
		this.facade.addToBasket(toIProduct(product));
		this.messageService.add({
			severity: 'success',
			summary: this.translate.get('BASKET.TOAST.ADDED'),
			detail: product.title,
		});
	}
}

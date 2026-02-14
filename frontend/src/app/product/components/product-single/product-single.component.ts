import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISingleProduct } from '../../../shared/types/product.inteface';
import { ActivatedRoute } from '@angular/router';
import { MainFacade } from '../../../shared/state/main-state/main.facade';
import { NavigationComponent } from '../../../shared/components/navigation/navigation.component';
import { TabsComponent } from '../../../shared/components/tabs/tabs.component';
import { VideoPlayerComponent } from '../../../shared/components/video-player/video-player.component';
import { SocialMediaComponent } from '../../../shared/components/social-media/social-media.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-product-single',
	templateUrl: './product-single.component.html',
	styleUrls: ['./product-single.component.scss'],
	standalone: true,
	imports: [CommonModule, RouterModule, NavigationComponent, TabsComponent, VideoPlayerComponent, SocialMediaComponent, FooterComponent],
})
export class ProductSingleComponent implements OnInit, OnDestroy {
	private facade = inject(MainFacade);
	private activatedRoute = inject(ActivatedRoute);
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

	addToBasket(product: ISingleProduct) {
		this.facade.addToBasket(product);
	}
}

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticaionGuard } from './services/authenticaion.guard';
import { ProductComponent } from './components/product-item/product.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { RouterModule } from '@angular/router';
import { GlobalErrorModule } from '../shared/components/global-error/global-error.module';
import { NotificationModule } from '../shared/components/notification/notification.module';
import { FocusDirective } from '../shared/directives/focus.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorService } from '../shared/services/error.service';
import { ProductSingleComponent } from './components/product-single/product-single.component';
import { NavigationModule } from '../shared/components/navigation/navigation.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { StoreModule } from '@ngrx/store';
import { productKey, productReducer } from '../shared/state/main-state/main.reducer';
import { SocialMediaComponent } from '../shared/components/social-media/social-media.component';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from '../shared/state/main-state/main.effects';

@NgModule({
	declarations: [ProductComponent, ProductPageComponent, ProductSingleComponent, CategoriesComponent, FocusDirective],
	imports: [
		CommonModule,
		GlobalErrorModule,
		FormsModule,
		ReactiveFormsModule,
		NavigationModule,
		NotificationModule,
		EffectsModule.forFeature([MainEffects]),
		StoreModule.forFeature({ name: productKey, reducer: productReducer }),
		SocialMediaComponent,
	],
	providers: [ErrorService],
})
export class ProductsModule {}

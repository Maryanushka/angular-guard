import { NgModule } from '@angular/core';
import { AboutPageComponent } from './components/about-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'about',
    component: AboutPageComponent,
  },
]


@NgModule({
	declarations: [
		AboutPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})

export class AboutModule {}
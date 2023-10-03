import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorModule } from '../shared/components/global-error/global-error.module';
import { SigninPageComponent } from './signin-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: 'signin',
    component: SigninPageComponent,
  },
];


@NgModule({
  declarations: [SigninPageComponent],
  imports: [
    CommonModule,
		GlobalErrorModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes)
  ]
})
export class SigninModule { }

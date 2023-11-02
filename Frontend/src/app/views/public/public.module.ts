import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { loginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PublicComponent,
    loginComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule, ReactiveFormsModule, FormsModule
  ]
})
export class PublicModule { }

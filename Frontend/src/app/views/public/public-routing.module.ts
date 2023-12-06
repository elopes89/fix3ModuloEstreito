import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { loginComponent } from '../login/login.component';
import { ResetComponent } from '../reset/reset.component';

const routes: Routes = [
  {path: '', component: PublicComponent,
  children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: loginComponent},
    {path: 'reset', component: ResetComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { PublicModule } from './views/public/public.module';
import { PrivateModule } from './views/private/private.module';
import { LogsComponent } from './shared/components/logs/logs.component';
import { ResetComponent } from './views/reset/reset.component';
import { EditarEmpresaComponent } from './shared/components/editar-empresa/editar-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LogsComponent,
    NotFoundComponent,
    ResetComponent,
    EditarEmpresaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PublicModule,
    PrivateModule
  ],

  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }

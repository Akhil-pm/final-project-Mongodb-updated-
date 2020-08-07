import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ZonesListComponent } from './zones-list/zones-list.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './auth.service';
import { AddZonesComponent } from './add-zones/add-zones.component';
import { EditZonesComponent } from './edit-zones/edit-zones.component';
import { TravelFormComponent } from './travel-form/travel-form.component';
import { SubmittedListComponent } from './submitted-list/submitted-list.component' ;

import {AuthGuard} from './auth.guard' ;
import {TokenInterceptorService} from './token-interceptor.service';
import { FooterComponent } from './footer/footer.component';
import {AdminGuard} from './admin.guard' ;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ZonesListComponent,
    SignupComponent,
    LoginComponent,
    AddZonesComponent,
    EditZonesComponent,
    TravelFormComponent,
    SubmittedListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService,AuthGuard,AdminGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

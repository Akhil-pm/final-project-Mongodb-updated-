import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZonesListComponent } from './zones-list/zones-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddZonesComponent } from './add-zones/add-zones.component';
import { EditZonesComponent } from './edit-zones/edit-zones.component';
import { TravelFormComponent } from './travel-form/travel-form.component';
import { SubmittedListComponent } from './submitted-list/submitted-list.component';

import {AuthGuard} from './auth.guard' ;
import {AdminGuard} from './admin.guard' ;


const routes: Routes = [
  {path:'',component:ZonesListComponent},
  {path:'reg',component:TravelFormComponent,canActivate:[AuthGuard]},
  {path:'reg_list',component:SubmittedListComponent,canActivate:[AdminGuard]},
  {path:'add',component:AddZonesComponent,canActivate:[AdminGuard]},
  {path:'edit',component:EditZonesComponent,canActivate:[AdminGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

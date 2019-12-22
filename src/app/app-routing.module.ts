import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
  {path: 'login', component: LoginComponent},
  // {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
  {path: 'admin', component: AdminComponent},
  {path: 'signup', component: SignupComponent },
  {path: '**', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }

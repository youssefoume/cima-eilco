import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthGuard } from './services/auth.guard';
import { UserGuard } from './services/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SingInComponent, canActivate:[UserGuard]},
  {path: 'sign-up', component: SingUpComponent, canActivate:[UserGuard] },
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'password-reset', component: PasswordResetComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
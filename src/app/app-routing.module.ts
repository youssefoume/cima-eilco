import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SingInComponent },
  {path: 'sign-up', component: SingUpComponent},
  {path: 'home', component: HomeComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'password-reset', component: PasswordResetComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/sign-in']);
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SingInComponent,canActivate: [SecureInnerPagesGuard] },
  {path: 'sign-up', component: SingUpComponent},
 {path:'home',component:HomeComponent,canActivate: [AuthGuard]},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'password-reset', component: PasswordResetComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule {}
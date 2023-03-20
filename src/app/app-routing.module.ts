import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuthGuard, AngularFireAuthGuardModule,  } from '@angular/fire/compat/auth-guard';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/sign-in']);
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SingInComponent },
  {path: 'sign-up', component: SingUpComponent},
 {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  // {path: 'home', component: HomeComponent,canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'password-reset', component: PasswordResetComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AngularFireAuthGuard]
})
export class AppRoutingModule {}
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthGuard } from './services/auth.guard';
import { UserGuard } from './services/user.guard';

import { MovieComponent } from './movie/movie.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

import { ProfilComponent } from './profil/profil.component';

import { SerieDetailsComponent } from './serie-details/serie-details.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { TvComponent } from './tv/tv.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SingInComponent, canActivate: [UserGuard] },
  { path: 'sign-up', component: SingUpComponent, canActivate: [UserGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'movie', component: MovieComponent, canActivate: [AuthGuard] },
  { path: 'tv', component: TvComponent, canActivate:[AuthGuard] },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'password-reset', component: PasswordResetComponent },

  {path: 'profil',component:ProfilComponent,canActivate:[AuthGuard]},
  { path: 'movie/:id', component: MovieDetailsComponent },

  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },

  { path: 'serie/:id', component: SerieDetailsComponent, canActivate: [AuthGuard] },
  { path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard] },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: '**', redirectTo : 'notfound' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
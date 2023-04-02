import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { SingInComponent } from './sing-in/sing-in.component';
import { FormsModule } from '@angular/forms';
import { SingUpComponent } from './sing-up/sing-up.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { DataFirestoreService } from './services/data-firestore.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ProfilComponent } from './profil/profil.component';
import { SerieDetailsComponent } from './serie-details/serie-details.component';
import { SearchComponent } from './search/search.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';

@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    SingUpComponent,
    HomeComponent,
    VerifyEmailComponent,
    PasswordResetComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    MovieDetailsComponent,
    SerieDetailsComponent,
    SearchComponent,
    ProfilComponent,
    FavoriteComponent,
    MovieComponent,
    TvComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
  ],
  providers: [ApiService, AuthService, DataFirestoreService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }

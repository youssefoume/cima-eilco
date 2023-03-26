import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SingInComponent } from './sing-in/sing-in.component';
import { FormsModule } from '@angular/forms';
import { SingUpComponent } from './sing-up/sing-up.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './movie/movie.component';
import { ApiService } from './services/api.service';
=======

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataFirestoreService } from './services/data-firestore.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

>>>>>>> ddd5436d3b0f39d83a5572d2d65c8fb89562e9b6

@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    SingUpComponent,
    HomeComponent,
    VerifyEmailComponent,
    PasswordResetComponent,
<<<<<<< HEAD
    MovieComponent
=======
    PageNotFoundComponent
>>>>>>> ddd5436d3b0f39d83a5572d2d65c8fb89562e9b6
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
<<<<<<< HEAD
  providers: [ApiService ,AuthService,  { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
=======
  providers: [AuthService,DataFirestoreService,  { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
>>>>>>> ddd5436d3b0f39d83a5572d2d65c8fb89562e9b6
  bootstrap: [AppComponent]
})
export class AppModule { }

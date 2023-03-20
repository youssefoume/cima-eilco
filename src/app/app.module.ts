import { AuthGuardModule } from '@angular/fire/auth-guard';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import {AngularFireAuthGuardModule,  } from '@angular/fire/compat/auth-guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    SingUpComponent,
    HomeComponent,
    VerifyEmailComponent,
    PasswordResetComponent
  ],
  imports: [
    FontAwesomeModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [AuthService,AngularFireAuthGuardModule,  { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
    ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { DataFirestoreService } from './data-firestore.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage : any = {login : '', register : '', sendEmailForVerification : '', forgotPassword : ''};

  constructor(private fireauth : AngularFireAuth, private router : Router,private data:DataFirestoreService,private db: AngularFireDatabase) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
        localStorage.setItem('user',JSON.stringify(res.user));

        if(res.user?.emailVerified == true) {
          let p={
            id:'',
            id_user:res.user?.uid,
            date:Date.now(),
            operation:'login'
          };
          this.data.add_profil(p);
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['/verify-email']);
        }

    }, err => {
        this.errorMessage.login = 'The email or password you entered is incorrect';
    })
  }

  // is Logged in
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  // register method
  register(email : string, password : string,username : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      if(res.user!=null){
            // res.user.updateProfile(dis:id);
            res.user.updateProfile({
              
              displayName: username
            });}

      this.sendEmailForVerification(res.user);
      this.router.navigate(['/sign-in']);
    }, err => {
      this.errorMessage.register = 'The email you entered is registered';
    })
  }

  // sign out
  async logout() {
     await this.fireauth.signOut();
     let user=localStorage.getItem('user');
     if(user!=null){
     let p={
             id:'',
             id_user:JSON.parse(user).uid,
             date:Date.now(),
             operation:'logout'
           };
     this.data.add_profil(p);}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userMail');
    this.router.navigate(['/sign-in']);
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/verify-email']);
      }, err => {
        alert('The email you entered isn\'t associated with an account');
      })
  }

  // email verification
  sendEmailForVerification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
        alert('The email you entered is incorrect');
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      localStorage.setItem('user',JSON.stringify(res.user));
      if(res.user==null) return;
      let p={
        id:'',
        id_user:res.user?.uid,
        date:Date.now(),
        operation:'login'
      };
      this.data.add_profil(p);

      this.router.navigate(['/home']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }

}

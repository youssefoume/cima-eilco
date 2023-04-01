import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage : any = {login : '', register : '', sendEmailForVerification : '', forgotPassword : ''};

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');

        if(res.user?.emailVerified == true) {
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
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.sendEmailForVerification(res.user);
      this.router.navigate(['/sign-in']);
    }, err => {
      this.errorMessage.register = 'The email you entered is registered';
    })
  }

  // sign out
  async logout() {
    await this.fireauth.signOut();
    localStorage.removeItem('token');
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

      this.router.navigate(['/home']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }

}

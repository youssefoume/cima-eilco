import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up-main.component.css', './sing-up-util.component.css']
})
export class SingUpComponent {
  email : string = '';
  password : string = '';
  repassword : string = '';
  username : string = '';
  inputNames : string[] = ['email', 'password', 'repassword'];
  isValide: any = { email : true , password: true, repassword : true, username : true};
  validateText: any = { email: '', password: '', username : '' };

  errorMessage: any;

  constructor(private auth : AuthService,private router : Router) { }

  ngOnInit(): void {
    this.errorMessage = this.auth.errorMessage;
  }

  signInWithGoogle() {
    this.auth.googleSignIn().then((res) => {
      this.router.navigate(['/home']);
    })
  }

  register() {
    this.errorMessage.register = null;
    const inputsElements : string[] = [this.email, this.password, this.repassword, this.username];

    this.isValide.email = true;
    for(let key of Object.keys(this.isValide)) this.isValide[key] = true;

    inputsElements.forEach((x,i) => {
      if(x.trim() === ''){
        this.isValide[this.inputNames[i]] = false;
        this.validateText[this.inputNames[i]] = `${this.inputNames[i].at(0)?.toUpperCase()}${this.inputNames[i].slice(1)} is required`; 
      }
    })
    
    if (this.email !== '' && this.email.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null){
      this.isValide.email = false;
      this.validateText.email = 'Email is not valid';
    }

    if(this.password !== '' && this.password.length < 8){
      this.isValide.password = false;
      this.validateText.password = '8 characaters at least';
    }

    if(this.password !== this.repassword){
      this.isValide.repassword = false;
      this.validateText.repassword = 'Doesn\'t match password'; 
    }

    if (!Object.values(this.isValide).includes(false)) {
      this.auth.register(this.email, this.password);
      console.log(this.auth.errorMessage.register);
      if(this.auth.errorMessage.register === ''){
        this.email = '';
        this.password = '';
        this.repassword = '';
        this.username = '';
      }
    }
  }

}


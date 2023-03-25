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
  inputNames : string[] = ['email', 'password', 'repassword'];
  isValide: any = { email : true , password: true, repassword : true};
  validateText: any = { email: '', password: '' };

  constructor(private auth : AuthService,private router : Router) { }

  ngOnInit(): void {
  }

  signInWithGoogle() {
    this.auth.googleSignIn().then((res) => {
      this.router.navigate(['/home']);
    })
  }

  register() {
    const inputsElements : string[] = [this.email, this.password, this.repassword];

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

    if(this.password !== this.repassword){
      this.isValide.repassword = false;
      this.validateText.repassword = 'Doesn\'t match password'; 
    }

    if (!Object.values(this.isValide).includes(false)) {
      this.auth.login(this.email, this.password);
      this.email = '';
      this.password = '';
    }
  }

}


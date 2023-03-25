import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in-main.component.css', './sing-in-util.component.css']
})
export class SingInComponent {
  email: string = '';
  password: string = '';
  inputNames : string[] = ['email', 'password'];
  isValide: any = { email : true , password: true, };
  validateText: any = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const inputsElements : string[] = [this.email, this.password];

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

    if (!Object.values(this.isValide).includes(false)) {
      this.auth.login(this.email, this.password);
      this.email = '';
      this.password = '';
    }
  }

  signInWithGoogle() {
    this.auth.googleSignIn().then((res) => {
      this.router.navigate(['/home']);
    })
  }

}

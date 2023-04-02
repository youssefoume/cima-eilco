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
  inputNames: string[] = ['email', 'password'];
  isValide: any = { email: true, password: true, };
  validateText: any = { email: '', password: '' };
  errorMessage: any;

  constructor(private auth: AuthService, private router: Router) {
    this.errorMessage = this.auth.errorMessage;
  }

  ngOnInit(): void {
    this.errorMessage.login = null;
  }

  login() {
    const inputsElements: string[] = [this.email, this.password];

    this.isValide.email = true;
    for (let key of Object.keys(this.isValide)) this.isValide[key] = true;

    inputsElements.forEach((x, i) => {
      if (x.trim() === '') {
        this.isValide[this.inputNames[i]] = false;
        this.validateText[this.inputNames[i]] = `${this.inputNames[i].at(0)?.toUpperCase()}${this.inputNames[i].slice(1)} is required`;
      }
    })

    if (this.email !== '' && this.email.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
      this.isValide.email = false;
      this.validateText.email = 'Email is not valid';
    }

    if (this.password !== '' && this.password.length < 8) {
      this.isValide.password = false;
      this.validateText.password = '8 characters at least';
    }

    if (!Object.values(this.isValide).includes(false)) {
      this.auth.login(this.email, this.password);
      if (this.auth.errorMessage.login === '') {
        localStorage.setItem('userMail', this.email);
        this.email = '';
        this.password = '';
      }
    }
  }

  signInWithGoogle() {
    this.auth.googleSignIn().then((res) => {
      this.router.navigate(['/home']);
    })
  }

}

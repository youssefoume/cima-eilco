import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset-main.component.css', './password-reset-util.component.css']
})
export class PasswordResetComponent {
  email: string = '';
  isValideEmail: boolean = true;
  textValidateEmail: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    if (this.email === '') {
      this.isValideEmail = false;
      this.textValidateEmail = 'Email is required';
    } else if (this.email !== '' && this.email.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
      this.isValideEmail = false;
      this.textValidateEmail = 'Email is not valid';
    }
    if (this.isValideEmail) {
      this.auth.forgotPassword(this.email);
      this.email = '';
    }
  }
}

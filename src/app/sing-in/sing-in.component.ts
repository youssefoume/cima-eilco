import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  email : string = '';
  password : string = '';

  constructor(private auth : AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password);

    
    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {
    this.auth.googleSignIn().then((res) => {
    this.router.navigate(['/home']);})


  }
 
}

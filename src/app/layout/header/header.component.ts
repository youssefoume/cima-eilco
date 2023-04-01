import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/services/api-movie.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navbg: any;
  title:any;

  constructor(private auth: AuthService, private service : MovieApiServiceService, private router : Router){}

  logout() {
    this.auth.logout();
  }
}

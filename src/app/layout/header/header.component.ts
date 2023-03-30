import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navbg: any;
  constructor(private auth: AuthService){}
  @HostListener('document:scroll') scrollover() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = { 'background-color': '#000000' }
    } else {
      this.navbg = { 'background-color': '#ffffff' }
    }
  }
  logout() {
    this.auth.logout();
  }
}

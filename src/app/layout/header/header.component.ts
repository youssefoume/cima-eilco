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
 
  logout() {
    this.auth.logout();
  }
}

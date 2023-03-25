import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService, private root : Router){}

  canActivate() {
    if( this.authService.isLoggedIn() ){
      return true;
    } 
    alert("You aren't logged in !!!");
    this.root.navigate(['/sign-in']);
    return false;
  }
  
}

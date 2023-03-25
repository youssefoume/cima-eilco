import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService : AuthService,private root : Router){}

  canActivate(){
    if(!this.authService.isLoggedIn()){
      return true;
    }
    this.root.navigate(['/home']);
    return false;
  }
  
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    if (localStorage.getItem('key') == null) {
      return false;
    } else if (localStorage.getItem('role') == 'admin') {
      return true;
    } else {
      localStorage.removeItem('key');
      localStorage.removeItem('role');
      return false;
    }
  }
}

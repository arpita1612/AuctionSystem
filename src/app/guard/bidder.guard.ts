import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidderGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('key') == null) {
      this.router.navigate(['login']);
      return false;
    } else if (localStorage.getItem('role') == 'bidder') {
      return true;
    } else {
      localStorage.removeItem('key');
      localStorage.removeItem('role');
      return this.router.parseUrl('login');
    }
  }

}

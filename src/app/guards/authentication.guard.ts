import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  p: string;

  constructor(
    private auth: AuthenticationService,
    private myRoute: Router,
  ) {
  }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const roles: string = next.data.roles;
    if (roles === 'isLogined') {
      if (!this.auth.isLoggedIn()) {
        return true;
      } else {
        this.myRoute.navigate(['/']);
        return false;
      }
    } else {
      if (this.auth.isLoggedIn()) {
        if (!roles) {
          this.myRoute.navigate(['home']);
          return;
        } else {
          return true;
        }
      } else {
        this.myRoute.navigate(['/auth']);
        return false;
      }
    }

  }

}

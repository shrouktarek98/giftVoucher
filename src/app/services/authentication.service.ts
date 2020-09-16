import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auth: BehaviorSubject<boolean>;



  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.auth = new BehaviorSubject(this.isAlreadyLoggedIn());
  }

  // Login Function
  async login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      return this.apiService.postData(
        'auth/login',
        { email, password },
      )
        .toPromise()
        .then((res: any) => {
          if (res.status) {
            localStorage.setItem('token', res.body.access_token);
            localStorage.setItem('name', res.body.user.username);
            localStorage.setItem('id', res.body.user.id);
          }
          // this.languagesService.setLanguages(res.body.language);
          resolve(res);
          this.auth.next(true);
        }, reject)
        ;
    });


  }

  getToken() {
    return localStorage.getItem('token');
  }

  // Logout Function
  async logout() {
    const logoutProm = this.apiService.getData<any>('logout', null, true).toPromise();
    await logoutProm;

    this.auth.next(false);

    // delete all user data after logout

    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  // isLoggedIn to check permation
  isLoggedIn() {
    return this.getToken() !== null;
  }

  isAlreadyLoggedIn() {
    return Boolean(localStorage.getItem('token'));
  }
}

import { ApiService } from './../services/api.service';
import { AuthenticationService } from './../services/authentication.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    remember: new FormControl(false),
  });

  loading = false;
  errorMsg = '';
  staticData: any = [];

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private cdr: ChangeDetectorRef,
    public api: ApiService) {

  }

  ngOnInit() {
    if (this.auth.isAlreadyLoggedIn()) {
      this.router.navigate(['/home']);
    }
    this.getData();
  }
  ngOnDestroy(): void {
    this.loading = false;
  }

  /// get Data Static
  getData() {
    this.api.getDataStatic().subscribe((data: any) => {
      this.staticData = data.auth.login;
      this.cdr.detectChanges();
    }, err => {
    });
  }

  // Submit Function
  async submit() {
    this.errorMsg = '';
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach((formControl) => {
        formControl.markAsDirty();
      });
      return;
    }

    const data = this.loginForm.value;

    this.loading = true;
    try {
      await this.auth.login(data.email, data.password).then((res: any) => {
        console.log(res);
        if (!res.error) {
          this.router.navigate(['/home']);
        } else {
          this.errorMsg = res.message;
        }
      });

    } catch (err) {
      this.errorMsg = err.message;
    }
    // this.cdr.detectChanges();
  }

}

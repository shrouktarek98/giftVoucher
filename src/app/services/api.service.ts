import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest, } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize, last, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public base = 'http://vouchers-sa.com/api/';
  Language = '../../../../../assets/EnglishFile.json';

  constructor(private http: HttpClient, private router: Router) { }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  getDataStatic() {
    return this.http.get(this.Language);
  }


  // Api Get
  getData<T>(
    apiRoute: string,
    urlParams: any = {},
    withToken: boolean = false
  ): Observable<T> {


    let headers = new HttpHeaders();
    // let params = new HttpParams();

    // headers = headers.append('Accept', 'application/json');

    if (withToken) {
      const token = localStorage.getItem('token');

      headers = headers.append('Authorization', `bearer ${token}`);
    }
    return this.http
      .get<T>(this.base + apiRoute, {
        headers,
        params: urlParams, // withCred makes sure Authorization headers are sent as well
      })
      .pipe(
        take(1),
        catchError((err) => {
          if (err.status === 401) {
            this.logout();
          }
          return throwError({
            error: true,
            status: err.status,
            message: err.error.message,
          });
        })
      );
  }


  // Api Post
  postData<T>(
    apiRoute: string,
    data: any,
    withToken: boolean = true,
    customHeaders?: any,
    reportProgress: boolean = false
  ): Observable<T> {

    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');

    if (withToken) {
      const token = localStorage.getItem('token');
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    if (customHeaders) {
      Object.keys(customHeaders).forEach((key) => {
        const value = customHeaders[key];
        if (value == null) {
          headers = headers.delete(key);
        } else {
          headers = headers.set(key, value);
        }
      });
    }

    const req = new HttpRequest('POST', this.base + apiRoute, data, {
      headers,
      reportProgress,
      withCredentials: withToken,
    });

    return this.http.request<T>(req).pipe(
      last(),
      map((res: any) => {
        return {
          status: res.status,
          ...res.body,
        };
      }),
      catchError((err) => {
        if (err.status === 401) {
        }
        return throwError({
          error: true,
          status: err.status,
          message: err.error.message,
          errMessages: err.error.errors
        });
      })
    );


  }
}

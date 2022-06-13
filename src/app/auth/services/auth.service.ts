import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private baseUrl: string = environment.baseUrl;
  private helper = new JwtHelperService();

  verifyAutentication(): Observable<boolean> {
    const token = localStorage.getItem('token') || undefined;
    return of(token != undefined && !this.helper.isTokenExpired(token));
  }

  login(username: string, password: string) {
    const requestOptions: Object = {
      responseType: 'text',
      headers: new HttpHeaders().set(
        'Access-Control-Allow-Origin',
        this.baseUrl
      ),
    };
    return this.http
      .post<String>(
        `${this.baseUrl}/auth/login`,
        {
          username: username,
          password: password,
        },
        requestOptions
      )
      .pipe(tap((res) => localStorage.setItem('token', res.toString())));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}

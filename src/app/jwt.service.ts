import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor {

  jwtHelper = new JwtHelperService();
  constructor(
    private router: Router
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('tokenlab');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }

  jwtexpired() {
    const token = localStorage.getItem('tokenlab');
    try {
      if (this.jwtHelper.isTokenExpired(token)) {
        localStorage.removeItem('tokenlab');
        return false;
      } else {
        return true;
      }
    } catch (err) {
      localStorage.removeItem('tokenlab');
      return false;
    }
  }

  decodeToken() {
    const token = localStorage.getItem('tokenlab');
    try {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return this.jwtHelper.decodeToken(token);
      } else {
        localStorage.removeItem('tokenlab');
        this.router.navigate(['login']);
        return false;
      }
    } catch (err) {
      localStorage.removeItem('tokenlab');
      this.router.navigate(['login']);
      return false;
    }
  }
}

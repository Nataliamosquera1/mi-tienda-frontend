import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/usuarios';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((resp: any) => {
        if (resp?.id && this.isBrowser) {
          localStorage.setItem('user', JSON.stringify(resp));
        }
      })
    );
  }

  getUser() {
    if (!this.isBrowser) return null;
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('user');
    }
  }

  isLogged(): boolean {
    return !!this.getUser();
  }

  registro(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, data);
  }

  isAdmin(): boolean {
    return this.getUser()?.rol === 'ROLE_ADMIN';
  }
}

import { Injectable } from '@angular/core';
import { User, Message, Token, Sponsor } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(login: string, password: string): Observable<User> {
    return this.http.post<User>('/api/auth/register', { login, password });
  }

  login(user: User) {
    return this.http.post<any>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token, role }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
          }
        )
      )
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`api/user/${id}`)
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/user')
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`/api/user/${user._id}`, user)
  }

  getTopSponsors(): Observable<String[]> {
    return this.http.get<String[]>(`/api/user/sponsors`)
  }

  delete(user: User): Observable<Message> {
    return this.http.delete<Message>(`/api/user/${user._id}`)
  }

  logout() {
    localStorage.clear()
  }

  get isAuthenticated() {
    return localStorage.getItem('token') && localStorage.getItem('role');
  }

  get token() {
    return localStorage.getItem('token');
  }

}

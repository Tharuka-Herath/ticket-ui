import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  login(credentials: { userName: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  register(user: { userName: string, password: string, roles: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, user);
  }
}

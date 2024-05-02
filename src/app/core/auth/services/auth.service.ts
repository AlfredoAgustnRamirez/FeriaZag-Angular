import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserPayload } from '../interfaces/user.interface';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(payload: UserPayload): Observable<User>{
    return this.http.post<User>(`${ENDPOINTS.api}user/login`, payload)
  }

}

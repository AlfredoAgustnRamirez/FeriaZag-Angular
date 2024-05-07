import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private userId: string | null = null;

  constructor(
    private http: HttpClient
  ) { }

  getUsuario(): Observable<IUsuario[]>{
    return this.http.get<IUsuario[]>(`${ENDPOINTS.api}user/listar`)
  }

  saveUsuario(payload: IUsuario): Observable<IUsuario>{
    return this.http.post<IUsuario>(`${ENDPOINTS.api}user/register`, payload)
  }

  desactivarUsuario(idUsuario: string): Observable<any>{
    return this.http.delete<any>(`${ENDPOINTS.api}user/desactivar/${idUsuario}`)
  }
  
  activarUsuario(idUsuario: string): Observable<any>{
    return this.http.delete<any>(`${ENDPOINTS.api}user/activar/${idUsuario}`)
  }

  updateUsuario(payload: IUsuario): Observable<IUsuario>{
    return this.http.put<IUsuario>(`${ENDPOINTS.api}user/update/${payload.iduser}`, payload)
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId(): string | null {
    return this.userId;
  }


}

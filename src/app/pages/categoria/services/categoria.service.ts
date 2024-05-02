import { Injectable } from '@angular/core';
import { ICategoria } from '../interfaces/categoria.interface';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  getCategoria(): Observable<ICategoria[]>{
    return this.http.get<ICategoria[]>(`${ENDPOINTS.api}categoria/listar`)
  }

  saveCategoria(payload: ICategoria): Observable<ICategoria>{
    return this.http.post<ICategoria>(`${ENDPOINTS.api}categoria/register`, payload)
  }

  updateCategoria(payload: ICategoria): Observable<ICategoria>{
    return this.http.put<ICategoria>(`${ENDPOINTS.api}categoria/update/${payload.idcategoria}`, payload)
  }

  desactivarCategoria(idCategoria: string): Observable<ICategoria>{
    return this.http.delete<ICategoria>(`${ENDPOINTS.api}categoria/desactivar/${idCategoria}`)
  }
  
  activarCategoria(idCategoria: string): Observable<ICategoria>{
    return this.http.delete<ICategoria>(`${ENDPOINTS.api}categoria/activar/${idCategoria}`)
  }


}

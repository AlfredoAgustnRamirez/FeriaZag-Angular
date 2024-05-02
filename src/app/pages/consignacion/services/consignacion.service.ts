import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { Observable } from 'rxjs';
import { IConsignacion } from '../interfaces/consignacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsignacionService {

  constructor(
    private http: HttpClient
  ) { }

  getConsignacion(): Observable<IConsignacion[]>{
    return this.http.get<IConsignacion[]>(`${ENDPOINTS.api}consignacion/listar`)
  }

  getConsignacionPorId(idconsignacion: string): Observable<IConsignacion>{
    return this.http.get<IConsignacion>(`${ENDPOINTS.api}consignacion/${idconsignacion}`)
  }

  saveConsignacion(payload: IConsignacion): Observable<IConsignacion>{
    return this.http.post<IConsignacion>(`${ENDPOINTS.api}consignacion/register`, payload)
  }

  desactivarConsignacion(idConsignacion: string): Observable<IConsignacion>{
    return this.http.delete<IConsignacion>(`${ENDPOINTS.api}consignacion/desactivar/${idConsignacion}`)
  }
  
  activarConsignacion(idConsignacion: string): Observable<IConsignacion>{
    return this.http.delete<IConsignacion>(`${ENDPOINTS.api}consignacion/activar/${idConsignacion}`)
  }

  updateConsignacion(payload: IConsignacion): Observable<IConsignacion>{
    return this.http.put<IConsignacion>(`${ENDPOINTS.api}consignacion/update/${payload.idconsignacion}`, payload)
  }

}

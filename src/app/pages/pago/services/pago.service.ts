import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPago } from '../interfaces/pago.interface';
import { IProducto } from '../../producto/interfaces/producto.interface';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(
    private http: HttpClient
  ) { }

  getProducto(): Observable<IProducto[]>{
    return this.http.get<IProducto[]>(`${ENDPOINTS.api}producto/listar`)
  }

  getProductoVendidos(): Observable<IProducto[]>{
    return this.http.get<IProducto[]>(`${ENDPOINTS.api}producto/vendidos`)
  }

  savePago(payload: IPago): Observable<IPago>{
    return this.http.post<IPago>(`${ENDPOINTS.api}pago/register`, payload)
  }

  updatePago(payload: IPago): Observable<IPago>{
    return this.http.put<IPago>(`${ENDPOINTS.api}pago/update/${payload.idpago}`, payload)
  }

}

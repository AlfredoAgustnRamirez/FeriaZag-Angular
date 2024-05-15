import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { Observable } from 'rxjs';
import { IVentasDetalles } from '../interfaces/ventas-detalles.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasDetallesService {

  constructor(
    private http: HttpClient,
  ) { }

  getVentaDetalle(): Observable<IVentasDetalles[]>{
    return this.http.get<IVentasDetalles[]>(`${ENDPOINTS.api}ventaDetalle/listar`)
  }

  getVentaDetalleDia(): Observable<IVentasDetalles[]>{
    return this.http.get<IVentasDetalles[]>(`${ENDPOINTS.api}ventaDetalle/listar/ventaDia`)
  }

  getVentaDetalleSemana(): Observable<IVentasDetalles[]>{
    return this.http.get<IVentasDetalles[]>(`${ENDPOINTS.api}ventaDetalle/listar/ventaSemana`)
  }

  getVentaDetalleMes(): Observable<IVentasDetalles[]>{
    return this.http.get<IVentasDetalles[]>(`${ENDPOINTS.api}ventaDetalle/listar/ventaMes`)
  }

}

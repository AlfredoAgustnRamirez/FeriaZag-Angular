import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { Observable } from 'rxjs';
import { IVenta } from '../interfaces/venta.interface';
import { IVentasDetalles } from '../../ventas-detalles/interfaces/ventas-detalles.interface';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(
    private http: HttpClient,
  ) { }

  getProducto(): Observable<IVenta[]>{
    return this.http.get<IVenta[]>(`${ENDPOINTS.api}venta/listar`)
  }

  registrarVenta(idUsuario: string, totalVenta: number, fecha: string, detalles: any[]) {
    const body = { 
      iduser: idUsuario, 
      total_venta: totalVenta, 
      fecha: fecha,
      detalles: detalles,      
    };
    return this.http.post<any>(`${ENDPOINTS.api}venta/register`, body);
  }

  desactivarProducto(idProducto: string): Observable<IVenta>{
    return this.http.delete<IVenta>(`${ENDPOINTS.api}venta/desactivar/${idProducto}`)
  }

}

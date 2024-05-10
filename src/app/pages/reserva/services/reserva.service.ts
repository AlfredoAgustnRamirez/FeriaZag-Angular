
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { Observable } from 'rxjs';
import { IVenta } from '../../venta/interfaces/venta.interface';
import { ProductoService } from '../../producto/services/producto.service';



@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(
    private http: HttpClient,
    private productoServices: ProductoService
  ) { }

  getProducto(): Observable<IVenta[]>{
    return this.http.get<IVenta[]>(`${ENDPOINTS.api}venta/listar`)
  }

  registrarVenta(idUsuario: string, totalVenta: number, fecha: string) {
    const body = {iduser: idUsuario, total_venta: totalVenta, fecha: fecha};
    return this.http.post<any>(`${ENDPOINTS.api}venta/register`, body);
  }

  desactivarProducto(idProducto: string): Observable<IVenta>{
    return this.http.delete<IVenta>(`${ENDPOINTS.api}venta/desactivar/${idProducto}`)
  }

}

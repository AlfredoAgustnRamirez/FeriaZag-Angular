import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { Observable } from 'rxjs';
import { IVenta } from '../interfaces/venta.interface';



@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(
    private http: HttpClient
  ) { }

  getProducto(): Observable<IVenta[]>{
    return this.http.get<IVenta[]>(`${ENDPOINTS.api}venta/listar`)
  }

  registrarVenta(idUsuario: string, totalVenta: number, fecha: string) {
    const body = {iduser: idUsuario, total_venta: totalVenta, fecha: fecha};
    return this.http.post<any>(`${ENDPOINTS.api}venta/register`, body);
  }

}

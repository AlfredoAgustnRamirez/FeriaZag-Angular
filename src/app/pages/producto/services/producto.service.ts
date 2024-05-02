import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { Observable } from 'rxjs';
import { IProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient
  ) { }

  getProducto(): Observable<IProducto[]>{
    return this.http.get<IProducto[]>(`${ENDPOINTS.api}producto/listar`)
  }

  desactivarProducto(idProducto: string): Observable<IProducto>{
    return this.http.delete<IProducto>(`${ENDPOINTS.api}producto/desactivar/${idProducto}`)
  }

  activarProducto(idProducto: string): Observable<IProducto>{
    return this.http.delete<IProducto>(`${ENDPOINTS.api}producto/activar/${idProducto}`)
  }

}

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

  getTodosProductos(): Observable<IProducto[]>{
    return this.http.get<IProducto[]>(`${ENDPOINTS.api}producto/todos`)
  }

  getProducto(): Observable<IProducto[]>{
    return this.http.get<IProducto[]>(`${ENDPOINTS.api}producto/listar`)
  }

  getProductoVendidos(): Observable<IProducto[]>{
    return this.http.get<IProducto[]>(`${ENDPOINTS.api}producto/vendidos`)
  }

  desactivarProducto(idProducto: string): Observable<IProducto>{
    return this.http.delete<IProducto>(`${ENDPOINTS.api}producto/desactivar/${idProducto}`)
  }

  activarProducto(idProducto: string): Observable<IProducto>{
    return this.http.delete<IProducto>(`${ENDPOINTS.api}producto/activar/${idProducto}`)
  }
  
  updateActivo(idProducto: string, nuevoEstado: string): Observable<IProducto>{
    const payload = { activo: nuevoEstado };
    return this.http.put<IProducto>(`${ENDPOINTS.api}producto/activo/${idProducto}`, payload)
  }

}

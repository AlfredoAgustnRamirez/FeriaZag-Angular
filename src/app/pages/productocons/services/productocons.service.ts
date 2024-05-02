import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductocons } from '../interfaces/productocons.inteface';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';




@Injectable({
  providedIn: 'root'
})
export class ProductoconsService {
  
  constructor(
    private http: HttpClient
  ) { }

  getProductoPorConsignacion(idconsignacion: string): Observable<IProductocons[]>{
    return this.http.get<IProductocons[]>(`${ENDPOINTS.api}productocons/${idconsignacion}`)
  }

  saveProducto(idconsignacion: string, payload: IProductocons): Observable<IProductocons>{
    return this.http.post<IProductocons>(`${ENDPOINTS.api}productocons/crear/${idconsignacion}`, payload)
  }

  desactivarProducto(idproducto: string): Observable<IProductocons>{
    return this.http.delete<IProductocons>(`${ENDPOINTS.api}productocons/desactivar/${idproducto}`)
  }

  activarProducto(idproducto: string): Observable<IProductocons>{
    return this.http.delete<IProductocons>(`${ENDPOINTS.api}productocons/activar/${idproducto}`)
  }

  updateProducto(payload: IProductocons): Observable<IProductocons>{
    return this.http.put<IProductocons>(`${ENDPOINTS.api}productocons/update/${payload.idproducto}`, payload)
  }


}

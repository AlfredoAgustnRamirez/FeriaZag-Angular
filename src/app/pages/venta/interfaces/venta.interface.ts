import { IVentasDetalles } from "../../ventas-detalles/interfaces/ventas-detalles.interface"

export interface IVenta{
   iduser?: string 
   idcabecera?: string
   idproducto?: string
   codconsignacion?: string
   idconsignacion?: string
   categoria?: string
   idcategoria?: string
   precio?: string
   descripcion: string
   codproducto: string
   fecha?: string
   total_venta?: string
   nuevoEstado?: string 
   detalles?: IVentasDetalles[]
}
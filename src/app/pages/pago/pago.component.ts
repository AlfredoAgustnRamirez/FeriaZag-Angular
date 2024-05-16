import { Component } from '@angular/core';
import { ProductoService } from '../producto/services/producto.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IProductocons } from '../productocons/interfaces/productocons.inteface';
import { IProducto } from '../producto/interfaces/producto.interface';
import { ICategoria } from '../categoria/interfaces/categoria.interface';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IPago } from './interfaces/pago.interface';
import { PagoService } from './services/pago.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    RouterModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzSelectModule
  ],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.scss'
})
export class PagoComponent {

  value: string = ''
  productos: IProductocons[] = []
  productosTmp: IProductocons[] = []
  listCategoria: ICategoria [] = []
  productosVendidos: IProducto[] = []
  productosNoVendidos: IProducto[] = []
  productosVendidosTmp: IProducto[] = []
  productosNoVendidosTmp: IProducto[] = []
  form!: IPago
  isVisible: boolean = false
  descripcion: string = ''
  idcategoria: string = ''
  codconsignacion: string = ''
  categoria: string = ''
  talle: string = ''
  precio: string = ''
  activo: string = ''
  consignacionId: string = ''
  nombre: string = ''
  codproducto: string = ''
  title?: string = ''
  codigoConsignacion?: string = ''
  valorinput1: string = ''
  valorinput2: string = ''
  opcionSeleccionada: string = '';
  fecha: string = ''

  constructor(
    private productoServices: ProductoService,
    private pagoServices: PagoService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ){
    // Inicializa ventaTmp con tus datos originales (ejemplo)
    this.productosTmp = [
      { descripcion: '', codproducto: ''},
      // Otros productos...
    ];
    // Inicializa venta con los datos originales al inicio
    this.productos = this.productosTmp;
    // Obtener el ID del usuario al inicializar el componente
  }

  ngOnInit(){
    this.obtenerProductosVendidos()
    this.initForm()
  }
  obtenerProductosVendidos() {
    this.productoServices.getProductoVendidos().subscribe(productos => {
      this.productosVendidos = productos;
      this.productosVendidosTmp = productos;
    });
  }

  searchPorDescripcion(){
    this.productosNoVendidosTmp = this.productosNoVendidos.filter((producto: IProductocons)=> producto.descripcion.toLocaleLowerCase().indexOf(this.valorinput1.toLocaleLowerCase()) > - 1) 
    this.productosVendidosTmp = this.productosVendidos.filter((producto: IProductocons)=> producto.descripcion.toLocaleLowerCase().indexOf(this.valorinput1.toLocaleLowerCase()) > - 1) 
  }
  
  searchPorCodigo(){
    this.productosNoVendidosTmp = this.productosNoVendidos.filter((producto: IProductocons)=> producto.codproducto.toLocaleLowerCase().indexOf(this.valorinput2.toLocaleLowerCase()) > - 1) 
    this.productosVendidosTmp = this.productosVendidos.filter((producto: IProductocons)=> producto.codproducto.toLocaleLowerCase().indexOf(this.valorinput2.toLocaleLowerCase()) > - 1) 
  }

   // Método para manejar el cambio en el select
   onSelectChange(event: any) {
    this.opcionSeleccionada = event.target.value;
  }

  desactivarProducto(idproducto: string){
    this.productoServices.desactivarProducto(idproducto).subscribe(_=>{
      this.message.success('Producto desactivado')
      this.obtenerProductosVendidos()
    })
  }

  activarProducto(idproducto: string){
    this.productoServices.activarProducto(idproducto).subscribe(_=>{
      this.message.success('Producto activado')
      this.obtenerProductosVendidos()
    })
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    if(this.form.idproducto){
      this.update()
    }else{
      this.createProducto()
    }
    this.isVisible = false
  }

  createProducto(){
    this.pagoServices.savePago(this.form).subscribe(_=>{
    this.message.success('Producto creado')
    //this.obtenerProductosPorConsignacion(this.consignacionId)
    this.initForm() 
    this.reset()
  });
}

update(){
  this.pagoServices.updatePago(this.form).subscribe(_=>{
    this.message.success('Categoria actualizado')
  })
}

reset(){
  this.codconsignacion = ''
  this.talle = ''
  this.precio = ''
  this.activo = ''
}

openModal(){
  this.initForm()
  this.isVisible = true
}

initForm(){
  this.form = {
    idconsignacion: '',
    fecha: ''
  }
}

}

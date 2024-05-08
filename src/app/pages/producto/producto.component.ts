import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IProducto } from './interfaces/producto.interface';
import { ProductoService } from './services/producto.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    RouterModule,
    NzPopconfirmModule,
    NzMessageModule
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent implements OnInit{
  value: string = ''
  productos: IProducto[] = []
  productosTmp: IProducto[] = []
  form!: IProducto
  isVisible: boolean = false
  idproducto: string = ''
  descripcion: string = ''
  idcategoria: string = ''
  productoid: string = ''
  codconsignacion: string = ''
  idconsignacion: string = ''
  codigo: string = ''
  categoria: string = ''
  talle: string = ''
  precio: string = ''
  activo: string = ''
  consignacionId: string = ''
  codproducto: string = ''
  valorinput1: string = ''
  valorinput2: string = ''


  constructor(
    private productoServices: ProductoService,
    private message: NzMessageService,
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
      this.getProducto()
   }

  openModal(){
    this.isVisible = true
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    this.isVisible = false
  }

  getProducto(){
      this.productoServices.getProducto().subscribe((producto: IProducto[])=>{
      this.productos = producto
      this.productosTmp = producto
   })
  }

  reset(){
    this.codconsignacion = ''
    this.talle = ''
    this.precio = ''
    this.activo = ''
 }
 

  desactivarProducto(idproducto: string){
    this.productoServices.desactivarProducto(idproducto).subscribe(_=>{
      this.message.success('Producto desactivado')
      this.getProducto()
    })
  }

  activarProducto(idproducto: string){
    this.productoServices.activarProducto(idproducto).subscribe(_=>{
      this.message.success('Producto activado')
      this.getProducto()
    })
  }

  searchPorDescripcion(){
    this.productos = this.productosTmp.filter((producto: IProducto)=> producto.descripcion.toLocaleLowerCase().indexOf(this.valorinput1.toLocaleLowerCase()) > - 1) 
  }
  
  searchPorCodigo(){
    this.productos = this.productosTmp.filter((producto: IProducto)=> producto.codproducto.toLocaleLowerCase().indexOf(this.valorinput2.toLocaleLowerCase()) > - 1) 
  }

}


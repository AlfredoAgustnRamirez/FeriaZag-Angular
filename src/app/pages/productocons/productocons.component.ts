import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IProductocons } from './interfaces/productocons.inteface';
import { ProductoconsService } from './services/productocons.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CategoriaService } from '../categoria/services/categoria.service';
import { ICategoria } from '../categoria/interfaces/categoria.interface';
import { IProducto } from '../producto/interfaces/producto.interface';
import { ProductoService } from '../producto/services/producto.service';

@Component({
  selector: 'app-productocons',
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
  templateUrl: './productocons.component.html',
  styleUrl: './productocons.component.scss'
})
export class ProductoconsComponent implements OnInit{

  value: string = ''
  productos: IProductocons[] = []
  productosTmp: IProductocons[] = []
  listCategoria: ICategoria [] = []
  productosVendidos: IProducto[] = []
  productosNoVendidos: IProducto[] = []
  productosVendidosTmp: IProducto[] = []
  productosNoVendidosTmp: IProducto[] = []
  form!: IProductocons
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

  constructor(
    private productoconsServices: ProductoconsService,
    private listcategoriaService: CategoriaService,
    private productoServices: ProductoService,
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
    this.consignacionId = this.route.snapshot.paramMap.get('idconsignacion') || '';
    this.obtenerProductosPorConsignacion(this.consignacionId)
    this.obtenerProductosVendidosPorConsignacion(this.consignacionId)
    this.obtenerTodosProductosPorConsignacion(this.consignacionId)
    this.initForm()
    this.getCategoria()
  }

   initForm(){
    this.form = {
      codproducto: '',
      idcategoria: '',
      descripcion: '',
      talle: '',
      precio: '',
      activo: ''
    }
  }

   getCategoria(){
    this.listcategoriaService.getCategoria().subscribe(listCategoria => {
      this.listCategoria = listCategoria
    })
  }

  openModal(){
    this.initForm()
    this.isVisible = true
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
      this.productoconsServices.saveProducto(this.consignacionId, this.form).subscribe(_=>{
      this.message.success('Producto creado')
      this.obtenerProductosPorConsignacion(this.consignacionId)
      this.initForm() 
      this.reset()
    });
  }

  reset(){
    this.codconsignacion = ''
    this.talle = ''
    this.precio = ''
    this.activo = ''
 }
 
  desactivarProducto(idproducto: string){
    this.productoconsServices.desactivarProducto(idproducto).subscribe(_=>{
      this.message.success('Producto desactivado')
      this.obtenerProductosPorConsignacion(this.consignacionId)
      this.obtenerProductosVendidosPorConsignacion(this.consignacionId)
      this.obtenerTodosProductosPorConsignacion(this.consignacionId)
    })
  }

  activarProducto(idproducto: string){
    this.productoconsServices.activarProducto(idproducto).subscribe(_=>{
      this.message.success('Producto activado')
      this.obtenerProductosPorConsignacion(this.consignacionId)
      this.obtenerProductosVendidosPorConsignacion(this.consignacionId)
      this.obtenerTodosProductosPorConsignacion(this.consignacionId)
    })
  }

  searchPorDescripcion(){
    this.productosNoVendidosTmp = this.productosNoVendidos.filter((producto: IProductocons)=> producto.descripcion.toLocaleLowerCase().indexOf(this.valorinput1.toLocaleLowerCase()) > - 1) 
    this.productosVendidosTmp = this.productosVendidos.filter((producto: IProductocons)=> producto.descripcion.toLocaleLowerCase().indexOf(this.valorinput1.toLocaleLowerCase()) > - 1) 
    this.productos = this.productosTmp.filter((producto: IProductocons)=> producto.descripcion.toLocaleLowerCase().indexOf(this.valorinput1.toLocaleLowerCase()) > - 1) 
  }
  
  searchPorCodigo(){
    this.productosNoVendidosTmp = this.productosNoVendidos.filter((producto: IProductocons)=> producto.codproducto.toLocaleLowerCase().indexOf(this.valorinput2.toLocaleLowerCase()) > - 1) 
    this.productosVendidosTmp = this.productosVendidos.filter((producto: IProductocons)=> producto.codproducto.toLocaleLowerCase().indexOf(this.valorinput2.toLocaleLowerCase()) > - 1) 
    this.productos = this.productosTmp.filter((producto: IProductocons)=> producto.codproducto.toLocaleLowerCase().indexOf(this.valorinput2.toLocaleLowerCase()) > - 1) 
  }
  
  // Método para manejar el cambio en el select
  onSelectChange(event: any) {
    this.opcionSeleccionada = event.target.value;
  }


  update(){
    this.productoconsServices.updateProducto(this.form).subscribe(_=>{
      this.message.success('Producto actualizado')
    })
  }

  edit(data: IProductocons){
    this.form = data
    this.isVisible = true
  }

  obtenerTodosProductosPorConsignacion(consignacionId: string) {
    this.productoconsServices.getTodosProductoPorConsignacion(this.consignacionId)
      .subscribe(producto => {
        const productoSeleccionado = producto[0];
        this.codigoConsignacion = productoSeleccionado.codconsignacion;
        this.productosTmp = producto;
        this.productos = producto;
      });
  }

  obtenerProductosPorConsignacion(consignacionId: string) {
    this.productoconsServices.getProductoPorConsignacion(this.consignacionId)
      .subscribe(producto => {
        const productoSeleccionado = producto[0];
        this.codigoConsignacion = productoSeleccionado.codconsignacion;
        this.productosVendidos = producto;
        this.productosVendidosTmp = producto; 
      });
  }

  obtenerProductosVendidosPorConsignacion(consignacionId: string) {
    this.productoconsServices.getProductoVendidosPorConsignacion(this.consignacionId)
      .subscribe(producto => {
        const productoSeleccionado = producto[0];
        this.codigoConsignacion = productoSeleccionado.codconsignacion;
        this.productosNoVendidos = producto;
        this.productosNoVendidosTmp = producto; 
      });
  }

}

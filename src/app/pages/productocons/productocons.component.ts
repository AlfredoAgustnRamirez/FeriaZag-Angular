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
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    NzMessageModule
  ],
  templateUrl: './productocons.component.html',
  styleUrl: './productocons.component.scss'
})
export class ProductoconsComponent {

  value: string = ''
  productos: IProductocons[] = []
  productosTmp: IProductocons[] = []
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

  constructor(
    private productoconsServices: ProductoconsService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ){}

  ngOnInit(){
    this.consignacionId = this.route.snapshot.paramMap.get('idconsignacion') || '';
    this.obtenerProductosPorConsignacion(this.consignacionId)
    this.initForm()
   }

   initForm(){
    this.form = {
      idcategoria: '',
      descripcion: '',
      talle: '',
      precio: '',
      activo: ''
    }
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
      this.productoconsServices.saveProducto(this.consignacionId,this.form).subscribe(_=>{
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
    })
  }

  activarProducto(idproducto: string){
    this.productoconsServices.activarProducto(idproducto).subscribe(_=>{
      this.message.success('Producto activado')
      this.obtenerProductosPorConsignacion(this.consignacionId)
    })
  }

  search(){
    this.productos = this.productosTmp.filter((producto: IProductocons)=> producto.descripcion.toLocaleLowerCase().indexOf(this.value.toLocaleLowerCase()) > -1) 
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

  obtenerProductosPorConsignacion(consignacionId: string) {
    this.productoconsServices.getProductoPorConsignacion(this.consignacionId)
      .subscribe(producto => {
        this.productosTmp = producto;
        this.productos = producto;
        const productoSeleccionado = producto[0];
        this.codigoConsignacion = productoSeleccionado.codconsignacion;
      });
  }
}

import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IProducto } from './interfaces/producto.interface';
import { ProductoService } from './services/producto.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { HttpClient } from '@angular/common/http';


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
  listOfData: IProducto[] = []
  listOfDataTmp: IProducto[] = []
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

  constructor(
    private productoServices: ProductoService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ){}

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
      this.listOfData = producto
      this.listOfDataTmp = producto
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

  search(){
    this.listOfData = this.listOfDataTmp.filter((producto: IProducto)=> producto.descripcion.toLocaleLowerCase().indexOf(this.value.toLocaleLowerCase()) > -1) 
  }

}


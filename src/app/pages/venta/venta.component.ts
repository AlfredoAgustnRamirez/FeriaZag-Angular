import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { VentaService } from './services/venta.service';
import { IVenta } from './interfaces/venta.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductoService } from '../producto/services/producto.service';
import { IProducto } from '../producto/interfaces/producto.interface';
import { ProductoComponent } from '../producto/producto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-venta',
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
    ProductoComponent,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.scss'
})
export class VentaComponent {
  venta: IVenta[] = []
  ventaTmp: IVenta[] = []
  isVisible: boolean = false
  value: string = ''
  descripcion: string = ''
  

  @Output() searchEvent = new EventEmitter<string>();


  constructor(
    private VentaService: VentaService,
    private productoServices: ProductoService,
    private message: NzMessageService,
    private NzModalService: NzModalService,
  ){ 
     // Inicializa ventaTmp con tus datos originales (ejemplo)
     this.ventaTmp = [
      { descripcion: '' },
      // Otros productos...
    ];
    // Inicializa venta con los datos originales al inicio
    this.venta = this.ventaTmp;
  }

  ngOnInit(){
    this.getProducto()
  }

  getProducto(){
    this.VentaService.getProducto().subscribe((producto: IVenta[])=>{
    this.venta = producto
    this.ventaTmp = producto
 })
}

search(){
  this.venta = this.ventaTmp.filter((producto: IVenta)=> producto.descripcion.toLocaleLowerCase().includes(this.value.toLocaleLowerCase())) 
}

  openModal(){
    this.isVisible = true  
  }

  handleCancel(){
    this.isVisible = false
  }

}

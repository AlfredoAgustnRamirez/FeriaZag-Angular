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
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductoService } from '../producto/services/producto.service';
import { IProducto } from '../producto/interfaces/producto.interface';
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
    NzMessageModule
  ],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.scss'
})
export class VentaComponent {
  listOfData: IVenta[] = []
  productos: IProducto[] = []
  productosTmp: IProducto[] = []
  listOfDataTmp: IVenta[] = []
  isVisible: boolean = false
  value: string = ''
  
  @Output() searchEvent = new EventEmitter<string>();

  searchInput: string = '';

  constructor(
    private VentaService: VentaService,
    private productoServices: ProductoService,
    private message: NzMessageService,
    private NzModalService: NzModalService,
  ){ }

  ngOnInit(){
  }


  openModal(){
    this.isVisible = true
  }


  handleCancel(){
    this.isVisible = false
  }

  title = 'my-app';
  searchQuery: string = '';
  searchResults: string[] = ['Angular', 'React', 'Vue', 'TypeScript', 'JavaScript'];
  showResults: boolean = false;

  onSearchInput(event: any) {
    this.searchInput = event.target.value;
    this.searchResults = this.filterResults(this.searchInput);
    this.showResults = this.searchInput.length > 0;
  }

  filterResults(query: string): string[] {
    return this.searchResults.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }
  


}

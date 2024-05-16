import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ProductoComponent } from '../producto/producto.component';
import { ProductoService } from '../producto/services/producto.service';
import { IVentasDetalles } from '../ventas-detalles/interfaces/ventas-detalles.interface';
import { VentasDetallesService } from './services/ventas-detalles.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ventas-detalles',
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
    RouterOutlet,
  ],
  templateUrl: './ventas-detalles.component.html',
  styleUrl: './ventas-detalles.component.scss',
})
export class VentasDetallesComponent implements OnInit {
  ventasDetalle: IVentasDetalles[] = [];
  ventasDetalleTmp: IVentasDetalles[] = [];
  ventasDetalleDelDia: IVentasDetalles[] = [];
  ventasDetalleDelDiaTmp: IVentasDetalles[] = [];
  ventasDetalleSemana: IVentasDetalles[] = [];
  ventasDetalleSemanaTmp: IVentasDetalles[] = [];
  ventasDetalleMes: IVentasDetalles[] = [];
  ventasDetalleMesTmp: IVentasDetalles[] = [];
  opcionSeleccionada: string = '';

  constructor(
    private ventasDetalles: VentasDetallesService,
    private productoServices: ProductoService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getVentasDetalles();
    this.getVentasDetallesDia();
    this.getVentasDetallesSemana();
    this.getVentasDetallesMes();
  }

  onSelectChange(event: any) {
    this.opcionSeleccionada = event.target.value;
  }

  getVentasDetalles() {
    this.ventasDetalles
      .getVentaDetalle()
      .subscribe((ventaDetalle: IVentasDetalles[]) => {
        this.ventasDetalle = ventaDetalle;
        this.ventasDetalleTmp = ventaDetalle;
      });
  }

  getVentasDetallesDia() {
    this.ventasDetalles
      .getVentaDetalleDia()
      .subscribe((ventaDetalle: IVentasDetalles[]) => {
        this.ventasDetalleDelDia = ventaDetalle;
        this.ventasDetalleDelDiaTmp = ventaDetalle;
      });
  }

  getVentasDetallesSemana() {
    this.ventasDetalles
      .getVentaDetalleSemana()
      .subscribe((ventaDetalle: IVentasDetalles[]) => {
        this.ventasDetalleSemana = ventaDetalle;
        this.ventasDetalleSemanaTmp = ventaDetalle;
      });
  }

  getVentasDetallesMes() {
    this.ventasDetalles
      .getVentaDetalleMes()
      .subscribe((ventaDetalle: IVentasDetalles[]) => {
        this.ventasDetalleMes = ventaDetalle;
        this.ventasDetalleMesTmp = ventaDetalle;
      });
  }

  filename = 'ExcelDeVentas.xlsx';
  exportExcel() {
    if (this.opcionSeleccionada === 'fecha_actual') {
      const ws = XLSX.utils.json_to_sheet(this.ventasDetalleDelDia);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
      XLSX.writeFile(wb, this.filename);
    } else if (this.opcionSeleccionada == 'fecha_de_la_semana') {
      const ws = XLSX.utils.json_to_sheet(this.ventasDetalleSemana);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
      XLSX.writeFile(wb, this.filename);
    } else if (this.opcionSeleccionada == 'fecha_mes') {
      const ws = XLSX.utils.json_to_sheet(this.ventasDetalleMes);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
      XLSX.writeFile(wb, this.filename);
    } else {
      const ws = XLSX.utils.json_to_sheet(this.ventasDetalle);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
      XLSX.writeFile(wb, this.filename);
    }
  }
}

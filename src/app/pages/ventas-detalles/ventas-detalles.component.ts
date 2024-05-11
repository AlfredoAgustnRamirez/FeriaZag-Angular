import { Component, OnDestroy, OnInit, PipeTransform } from '@angular/core';
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
import { AuthService } from '../../core/auth/services/auth.service';
import { IUsuario } from '../usuario/interfaces/usuario.interface';
import { Subscription } from 'rxjs';
import { ProductoService } from '../producto/services/producto.service';
import { IVentasDetalles } from '../ventas-detalles/interfaces/ventas-detalles.interface';
import { VentasDetallesService } from './services/ventas-detalles.service';

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
  styleUrl: './ventas-detalles.component.scss'
})
export class VentasDetallesComponent implements OnInit{

  ventasDetalle: IVentasDetalles[] = [];
  ventasDetalleTmp: IVentasDetalles[] = [];

  constructor(
    private ventasDetalles: VentasDetallesService,
    private productoServices: ProductoService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getVentasDetalles();
  }

  getVentasDetalles() {
    this.ventasDetalles.getVentaDetalle().subscribe((ventaDetalle: IVentasDetalles[]) => {
      this.ventasDetalle = ventaDetalle;
      this.ventasDetalleTmp = ventaDetalle;
    });
  }

}

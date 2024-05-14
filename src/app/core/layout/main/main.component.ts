import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SESSION } from '../../../share/constants/session.constant';
import { ProductoService } from '../../../pages/producto/services/producto.service';
import { IProducto } from '../../../pages/producto/interfaces/producto.interface';
import { IConsignacion } from '../../../pages/consignacion/interfaces/consignacion.interface';
import { ConsignacionService } from '../../../pages/consignacion/services/consignacion.service';
import { ProductoconsService } from '../../../pages/productocons/services/productocons.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isCollapsed = true;
  productos: IProducto[] = []
  productosTmp: IProducto[] = []
  consignacion: IConsignacion [] = []
  consignacionTmp: IConsignacion [] = []
  idconsignacion: string = ''
  consignacionId: string = ''

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private productoconsService: ProductoconsService,
    private consignacionServices: ConsignacionService
  ){}

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem(SESSION.localStorage)
    this.router.navigate(['/'])
  }

}

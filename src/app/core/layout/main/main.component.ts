import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SESSION } from '../../../share/constants/session.constant';
import { ProductoService } from '../../../pages/producto/services/producto.service';
import { IProducto } from '../../../pages/producto/interfaces/producto.interface';

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
  

  constructor(
    private router: Router,
    private productoService: ProductoService
  ){}

  ngOnInit() {
    this.obtenerProductos()
  }

  logout(){
    localStorage.removeItem(SESSION.localStorage)
    this.router.navigate(['/'])
  }
  
  obtenerProductos(){
    this.productoService.getProducto().subscribe((productos: IProducto[]) => {
      this.productos = productos;
      this.productosTmp = productos;
    });
  }

}

import { Component, OnDestroy, OnInit, PipeTransform } from '@angular/core'
import { VentaService } from './services/venta.service';
import { IVenta } from './interfaces/venta.interface';
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
  styleUrl: './venta.component.scss',
})
export class VentaComponent implements OnInit, OnDestroy {
  venta: IVenta[] = []
  ventaTmp: IVenta[] = []
  productosAgregados: IVenta[] = [];
  listUsuario: IUsuario [] = []
  isVisible: boolean = false
  value: string = ''
  descripcion: string = ''
  totalVenta: string = '';
  precio: string = ''
  iduser: string = ''
  codconsignacion?: string = ''
  idcabecera?: string = ''
  codproducto: string = ''
  valorinput1: string = ''
  valorinput2: string = ''
  userId: string = '';
  fecha: string = ''
  total_venta: string = ''
  private ventaSubscription: Subscription | undefined;

  constructor(
    private VentaService: VentaService,
    private AuthService : AuthService,
    private message: NzMessageService,
  ){ 
     // Inicializa ventaTmp con tus datos originales (ejemplo)
     this.ventaTmp = [
      { descripcion: '', codproducto: ''},
      // Otros productos...
    ];
    // Inicializa venta con los datos originales al inicio
    this.venta = this.ventaTmp;
    // Obtener el ID del usuario al inicializar el componente
  }

  ngOnInit(){
    this.userId = this.AuthService.getUserId()    
    this.getProducto()
  }

  ngOnDestroy() {
    // Desuscribirse para evitar memory leaks
    if (this.ventaSubscription) {
      this.ventaSubscription.unsubscribe();
    }
  }

  getProducto(){
    this.VentaService.getProducto().subscribe((producto: IVenta[])=>{
    this.venta = producto
    this.ventaTmp = producto
 });
}

agregarProducto(producto: IVenta): void {
  this.productosAgregados.push(producto);
  this.actualizarTotalVenta()
}


actualizarTotalVenta(): void {
  // Inicializar totalVenta como número
  let totalNumerico: number = 0;
  // Sumar los precios de los productos en el array productosAgregados
  for (const producto of this.productosAgregados) {
      // Convertir el precio del producto de string a número y sumarlo
      totalNumerico += parseFloat(producto.precio || '');
  }
  // Asignar el total numerico a totalVenta como string con dos decimales
  this.totalVenta = '$ ' + totalNumerico.toFixed(2);
}

 // Método para eliminar un producto de la venta
 eliminarProducto(idproducto: string): void {
  // Inicializar totalVenta como número
  let totalNumerico: number = 0;
    this.productosAgregados = this.productosAgregados.filter(producto => producto.idproducto !== idproducto);
  // Restar los precios de los productos en el array productosAgregados
  this.totalVenta = '$ ' + this.productosAgregados.reduce((total, producto) => total + parseFloat(producto.precio || '0'), 0).toFixed(2);
  }


searchPorDescripcion(){
  this.venta = this.ventaTmp.filter((producto: IVenta)=> producto.descripcion.toLocaleLowerCase().includes(this.valorinput1.toLocaleLowerCase())) 
}

searchPorCodigo(){
  this.venta = this.ventaTmp.filter((producto: IVenta)=> producto.codproducto.toLocaleLowerCase().includes(this.valorinput2.toLocaleLowerCase())) 
}

  openModal(){
    this.isVisible = true  
  }

  handleCancel(){
    this.isVisible = false
  }

  registrarVenta() {
    this.actualizarTotalVenta()
    let totalString: string = this.totalVenta
    let total: number = parseFloat(totalString.replace('$',''))
    this.VentaService.registrarVenta(this.userId, total, this.fecha).subscribe(_=> {
      this.message.success('Venta registrada correctamente:');
      },
      (error) => {
        this.message.success('Error al registrar la venta:', error);
      }
    ); 
  }
}

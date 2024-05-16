import { Component, OnDestroy, OnInit } from '@angular/core';
import { VentaService } from './services/venta.service';
import { IVenta } from './interfaces/venta.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [
    NzInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.scss',
})
export class VentaComponent implements OnInit, OnDestroy {
  venta: IVenta[] = [];
  ventaTmp: IVenta[] = [];
  productosAgregados: IVenta[] = [];
  productosAgregadoss: string[] = [];
  productosEliminados: string[] = [];
  productosDisponibles: IVenta[] = [];
  listUsuario: IUsuario[] = [];
  form!: FormGroup;
  isVisible: boolean = false;
  value: string = '';
  descripcion: string = '';
  totalVenta: string = '$ 0.00';
  precio: string = '';
  iduser: string = '';
  idproducto: string = '';
  codconsignacion?: string = '';
  idcabecera?: string = '';
  codproducto: string = '';
  productoId: string = ''
  valorinput1: string = '';
  valorinput2: string = '';
  userId: string = '';
  fecha: string = '';
  nuevoEstado: string = '';
  init: boolean = false;
  private ventaSubscription: Subscription | undefined;

  constructor(
    private VentaService: VentaService,
    private AuthService: AuthService,
    private productoServices: ProductoService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {
    // Inicializa ventaTmp con tus datos originales (ejemplo)
    this.ventaTmp = [
      { descripcion: '', codproducto: '' },
      // Otros productos...
    ];
    // Inicializa venta con los datos originales al inicio
    this.venta = this.ventaTmp;
    // Obtener el ID del usuario al inicializar el componente
    this.initForm();
  }

  ngOnInit() {
    this.userId = this.AuthService.getUserId();
    this.getProducto();
  }

  ngOnDestroy() {
    // Desuscribirse para evitar memory leaks
    if (this.ventaSubscription) {
      this.ventaSubscription.unsubscribe();
    }
  }

  initForm() {
    this.form = this.fb.group({
      idproducto: new FormControl(''),
      codproducto: new FormControl(''),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    });
  }

  getProducto() {
    this.VentaService.getProducto().subscribe((producto: IVenta[]) => {
      this.venta = producto;
      this.ventaTmp = producto;
    });
  }

  agregarProducto(producto: IVenta) {
    this.productosAgregados.push(producto);
    // Agregar el código del producto a la lista de productos agregados
    this.productosAgregadoss.push(producto.codproducto);
    this.actualizarTotalVenta();
    this.limpiarBusqueda();
  }

  // Método para eliminar un producto de la venta
  eliminarProducto(idproducto: string) {
    // Inicializar totalVenta como número
    let totalNumerico: number = 0;
    this.productosAgregados = this.productosAgregados.filter(
      (producto) => producto.idproducto !== idproducto
    );

    // Restar los precios de los productos en el array productosAgregados
    this.totalVenta =
      '$ ' +
      this.productosAgregados
        .reduce(
          (total, producto) => total + parseFloat(producto.precio || '0'),
          0
        )
        .toFixed(2);
    // Volver a aplicar el filtro de búsqueda
    this.searchPorCodigo();
  }

  actualizarTotalVenta() {
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

  searchPorDescripcion() {
    this.venta = this.ventaTmp.filter((producto: IVenta) =>
      producto.descripcion
        .toLocaleLowerCase()
        .includes(this.valorinput1.toLocaleLowerCase())
    );
  }

  searchPorCodigo() {
    this.venta = this.ventaTmp.filter(
      (producto: IVenta) =>
        producto.codproducto
          .toLocaleLowerCase()
          .includes(this.valorinput2.toLocaleLowerCase()) &&
        !this.productosAgregadoss.includes(producto.codproducto)
    );
  }

  limpiarBusqueda() {
    this.valorinput1 = '';
    this.valorinput2 = '';
    // Actualizar la lista de productos según la búsqueda vacía
    this.searchPorDescripcion();
    this.searchPorCodigo();
  }

  openModal() {
    this.initForm();
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.init = true;
    if (this.form.valid) {
      this.agregarProducto(this.form.value);
      this.isVisible = false;
    }
  }

  registrarVenta() {
    this.actualizarTotalVenta();
    let totalString: string = this.totalVenta;
    let total: number = parseFloat(totalString.replace('$', ''));

    // Crear el array de detalles
    const detalles = this.productosAgregados.map((producto) => ({
      idproducto: producto.idproducto,
      precio: producto.precio,
    }));

    this.VentaService.registrarVenta(
      this.userId,
      total,
      this.fecha,
      detalles
    ).subscribe(
      (_) => {
        this.message.success('Venta registrada correctamente:');
        //Cambiar el estado de activo despues realizar la venta
        this.productosAgregados.forEach((producto) => {
          const nuevoEstado = producto.nuevoEstado || '';
          this.updateActivo(producto.idproducto || '', nuevoEstado);
        });
        this.resetValores();
        this.getProducto();
        this.actualizarTotalVenta();
      },
      (error) => {
        this.message.success('Error al registrar la venta:', error);
      }
    );
  } 

  updateActivo(idProducto: string, nuevoEstado: string) {
    this.productoServices
      .updateActivo(idProducto, nuevoEstado)
      .subscribe((_) => {});
  }

  resetValores() {
    this.totalVenta = '';
    this.productosAgregados = [];
  }

  get VentaID() {
    return this.form.get('idcabecera');
  }

  get Codproducto() {
    return this.form.get('codproducto');
  }

  get ProductoId() {
    return this.form.get('idproducto');
  }

  get Descripcion() {
    return this.form.get('descripcion');
  }

  get Precio() {
    return this.form.get('precio');
  }
}

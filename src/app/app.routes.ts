import { Routes } from '@angular/router';
import { MainComponent } from './core/layout/main/main.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },

  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
      //Rutas de consignacion
      { path: 'consignacion', loadChildren: () => import('./pages/consignacion/consignacion.routes').then(m => m.CONSIGNACION_ROUTES)}, 
      //Rutas de producto
      { path: 'producto', loadChildren: () => import('./pages/producto/producto.routes').then(m => m.PRODUCTO_ROUTES) },
      //Rutas de producto por consignacion
      { path: 'productocons/:idconsignacion', loadChildren: () => import('./pages/productocons/productocons.routes').then(m => m.PRODUCTOCONS_ROUTES) },    
      //Rutas de categoria
      { path: 'categoria', loadChildren: () => import('./pages/categoria/categoria.routes').then(m => m.CATEGORIA_ROUTES) },
      //Rutas de venta
      { path: 'venta', loadChildren: () => import('./pages/venta/venta.routes').then(m => m.VENTA_ROUTES) },
       //Rutas de ventas detalles
       { path: 'ventas-detalles', loadChildren: () => import('./pages/ventas-detalles/ventas-detalles.routes').then(m => m.VENTASDETALLES_ROUTES) },
      //Rutas de usuario
      { path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.routes').then(m => m.USUARIO_ROUTES) },
      //Rutas de usuario
      { path: 'reserva', loadChildren: () => import('./pages/reserva/reserva.routes').then(m => m.RESERVA_ROUTES) },

    ]

    },
  { path: 'auth', loadComponent: () => import('./core/auth/components/auth/auth.component').then(m => m.AuthComponent) },
 
];

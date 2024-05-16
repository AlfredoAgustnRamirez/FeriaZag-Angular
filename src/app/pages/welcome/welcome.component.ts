import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  horaActual: string = '';
  fechaActual: string = '';
  userId: string | null = null;

  constructor(private AuthService: AuthService,) {
    this.mostrarFechaHora(); 
    setInterval(() => this.mostrarFechaHora(), 1000);
   }

  ngOnInit() { 
    this.userId = this.AuthService.getUserId()
    this.userId = this.AuthService.getUserNombre()
  }

  mostrarFechaHora() {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString(); // Obtiene la fecha actual en formato local
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');

    this.fechaActual = fecha;
    this.horaActual = `${horas}:${minutos}:${segundos}`;
  }

}

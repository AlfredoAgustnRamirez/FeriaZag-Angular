import { Component, NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../services/auth.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzPopconfirmModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  passwordVisible = false
  email: string = ''
  password: string = ''
  userId: string  = ''
  nombreUsr: string = ''

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private message: NzMessageService,
  ){ }

  login(){
    const payload = {
      email: this.email,
      password: this.password
    } 
    
    this.AuthService.login(payload).subscribe((session => {
       console.log('Respuesta del servicio:', session);
     if (session) {
         localStorage.setItem('SESSION.localStorage', JSON.stringify(session));
         this.userId = session.userId;
         this.nombreUsr = session.nombreUsr;
         const userId = session.userId;
         localStorage.setItem('userId', userId);
         this.router.navigate(['/welcome']);
       } 
     }),
     (error) => {
       this.message.error('Error al iniciar sesión:', error);
       // Puedes agregar aquí cualquier lógica adicional para manejar este error
     }
   );
  }
}


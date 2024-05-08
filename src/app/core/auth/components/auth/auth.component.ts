import { Component, NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../services/auth.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { SESSION } from '../../../../share/constants/session.constant';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Session, User, UserPayload } from '../../interfaces/user.interface';
import { id_ID } from 'ng-zorro-antd/i18n';



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
       // Verifica la estructura de la respuesta
       console.log('Respuesta del servicio:', session);

       // Verifica si session.iduser está presente y no es undefined
       if (session) {
         localStorage.setItem('SESSION.localStorage', JSON.stringify(session));
         this.userId = session.userId;
         this.nombreUsr = session.nombreUsr;
         const userId = session.userId;
         localStorage.setItem('userId', userId);
         this.router.navigate(['/welcome']);
       } else {
         console.error('El ID de usuario no está definido en la sesión.');
         // Puedes agregar aquí cualquier lógica adicional para manejar este caso
       }
     }),
     (error) => {
       console.error('Error al iniciar sesión:', error);
       // Puedes agregar aquí cualquier lógica adicional para manejar este error
     }
   );
  }
}


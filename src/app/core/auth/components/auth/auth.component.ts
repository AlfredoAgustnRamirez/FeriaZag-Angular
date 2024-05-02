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

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private message: NzMessageService,
  ){ }

  login(): void{
    const payload = {
      email: this.email,
      password: this.password
    } 
    
    this.AuthService.login(payload).subscribe(
      (session) => {
        localStorage.setItem('SESSION.localStorage', JSON.stringify(session));
        this.router.navigate(['/welcome']);
      },
      (error) => {
        if (error.status === 401) {
          this.message.error('Correo o contraseña incorrectos. Por favor, inténtelo de nuevo.');
        } else {
          this.message.error('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
          console.error('Error en la autenticación:', error);
        }
      }
    );
  }
}


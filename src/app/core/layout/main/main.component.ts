import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RotateRightOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SESSION } from '../../../share/constants/session.constant';

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

  constructor(
    private router: Router
  ){}

  logout(){
    localStorage.removeItem(SESSION.localStorage)
    this.router.navigate(['/'])
  }
}

import { Component, OnInit } from '@angular/core'
import { UsuarioService } from './services/usuario.service';
import { IUsuario } from './interfaces/usuario.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    RouterModule,
    NzPopconfirmModule,
    NzMessageModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

  listOfData: IUsuario[] = []
  listOfDataTmp: IUsuario[] = []
  form!: IUsuario
  isVisible: boolean = false
  value: string = ''
  nombre: string = ''
  apellido: string = ''
  email: string = ''
  activo: string = ''
  usuario: string = ''
  iduser: string = ''
  password: string = ''

  constructor(
    private UsuarioService: UsuarioService,
    private message: NzMessageService,
    
  ){ }

  ngOnInit(){
    this.initForm()
    this.getUsuario()
  }

  initForm(){
    this.form = {
      nombre: '',
      apellido: '',
      email: '',
      usuario: '',
      activo: ''
    }
  }

  openModal(){
    this.initForm()
    this.isVisible = true
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    if(this.form.iduser){
      this.update()
    }else{
      this.createUsuario()
    }
    this.isVisible = false
  }

  getUsuario(){
    this.UsuarioService.getUsuario().subscribe((usuario: IUsuario[])=>{
      this.listOfData = usuario
      this.listOfDataTmp = usuario
    });
  }

  createUsuario(){
      this.UsuarioService.saveUsuario(this.form).subscribe(_=>{
      this.message.success('Usuario guardado')
      this.getUsuario()
    })
  }

  search(){
    this.listOfData = this.listOfDataTmp.filter((usuario: IUsuario)=> usuario.nombre.toLocaleLowerCase().indexOf(this.value.toLocaleLowerCase()) > -1) 
  }

  activarUsuario(iduser: string){
    this.UsuarioService.activarUsuario(iduser).subscribe(_=>{
      this.message.success('Usuario activado')
      this.getUsuario()
    })
  }

  desactivarUsuario(iduser: string){
    this.UsuarioService.desactivarUsuario(iduser).subscribe(_=>{
      this.message.success('Usuario desactivado')
      this.getUsuario()
    })
  }

  update(){
    this.UsuarioService.updateUsuario(this.form).subscribe(_=>{
      this.message.success('Usuario actualizado')
    })
  }

  edit(data: IUsuario){
    this.form = data
    this.isVisible = true
  }
  

}

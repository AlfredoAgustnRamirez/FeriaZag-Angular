import { Component, OnInit } from '@angular/core'
import { UsuarioService } from './services/usuario.service';
import { IUsuario } from './interfaces/usuario.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    RouterModule,
    NzPopconfirmModule,
    NzMessageModule,
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

  listOfData: IUsuario[] = []
  listOfDataTmp: IUsuario[] = []
  form!: FormGroup
  isVisible: boolean = false
  value: string = ''
  nombre: string = ''
  apellido: string = ''
  email: string = ''
  activo: string = ''
  usuario: string = ''
  iduser: string = ''
  password: string = ''
  userId: string | null = null
  init: boolean = false
  UsuarioId: string = ''

  constructor(
    private UsuarioService: UsuarioService,
    private message: NzMessageService,
    private fb: FormBuilder
  ){
    this.initForm()
  }

  ngOnInit(){
    this.getUsuario()
    this.userId = this.UsuarioService.getUserId();
  }

  initForm(){
    this.form = this.fb.group ({
      listId: new FormControl(''),
      iduser: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      activo: new FormControl('Si', [Validators.required])
    })
  }

  openModal(){
    this.initForm()
    this.isVisible = true
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    this.init = true
    if(this.UsuarioId){
      if(this.form.valid){
      this.update()
    }else{
      this.createUsuario()
    }
    this.isVisible = false
    }
    
  }

  getUsuario(){
    this.UsuarioService.getUsuario().subscribe((usuario: IUsuario[])=>{
      this.listOfData = usuario
      this.listOfDataTmp = usuario
    });
  }

  createUsuario(){
      this.UsuarioService.saveUsuario(this.form.value).subscribe(_=>{
      this.message.success('Usuario guardado')
      this.getUsuario()
      this.initForm()
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
    this.UsuarioService.updateUsuario(this.form.value).subscribe(_=>{
      this.message.success('Usuario actualizado')
    })
    this.getUsuario()
    this.initForm()
  }

  edit(data: IUsuario){
    this.UsuarioId = this.iduser
    this.form.patchValue(data)
    this.isVisible = true
  }
  
  get Nombre(){
    return this.form.get('nombre')
  }

  get Apellido(){
    return this.form.get('apellido')
  }

  get Email(){
    return this.form.get('email')
  }

  get Usuario(){
    return this.form.get('usuario')
  }

  get Password(){
    return this.form.get('password')
  }

  get Activo(){
    return this.form.get('activo')
  }

  get UserID(){
    return this.form.get('iduser')
  }
}

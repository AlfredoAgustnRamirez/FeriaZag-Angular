import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IConsignacion } from './interfaces/consignacion.interface';
import { ConsignacionService } from './services/consignacion.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzMessageModule,
    NzPopconfirmModule,
    RouterModule
  ],
  templateUrl: './consignacion.component.html',
  styleUrl: './consignacion.component.scss'
})
export class ConsignacionComponent implements OnInit{
  value: string = ''
  consignacion: IConsignacion[] = []
  consignacionTmp: IConsignacion[] = []
  form!: IConsignacion
  isVisible: boolean = false
  idconsignacion: string = ''
  idcategoria: string = ''
  id: number = 0
  codconsignacion: string = ''
  nombre: string = ''
  apellido: string = ''
  instagram: string = ''
  domicilio: string = ''
  celular: string = ''
  cbu: string = ''
  observacion: string = ''
  activo: string = ''
  consignacionId: string = '' 
  valorinput1: string = ''
  valorinput2: string = ''

  constructor(
    private consignacionServices: ConsignacionService,
    private message: NzMessageService,
  ){
    // Inicializa ventaTmp con tus datos originales (ejemplo)
    this.consignacionTmp = [
      { nombre: '', codconsignacion: ''},
      // Otros productos...
    ];
    // Inicializa venta con los datos originales al inicio
    this.consignacion = this.consignacionTmp;
    // Obtener el ID del usuario al inicializar el componente
   }

  ngOnInit(){
    this.getConsignacion()
    this.initForm()
  }

  getConsignacion(){
    this.consignacionServices.getConsignacion().subscribe((consignacion: IConsignacion[])=>{
      this.consignacion = consignacion
      this.consignacionTmp = consignacion
    });
  }

  searchPorNombre(){
    this.consignacion = this.consignacionTmp.filter((producto: IConsignacion)=> producto.nombre.toLocaleLowerCase().indexOf(this.valorinput1.toLocaleLowerCase()) > - 1) 
  }
  
  searchPorCodCosignacion(){
    this.consignacion = this.consignacionTmp.filter((producto: IConsignacion)=> producto.codconsignacion.toLocaleLowerCase().indexOf(this.valorinput2.toLocaleLowerCase()) > - 1) 
  }
  createConsignacion(){
      this.consignacionServices.saveConsignacion(this.form).subscribe(_=>{
      this.message.success('Consignacion guardado')
      this.getConsignacion()
      this.initForm() 
      this.reset()
    })
  }

  reset(){
     this.codconsignacion = ''
     this.nombre = ''
     this.apellido = ''
     this.instagram = ''
     this.domicilio = ''
     this.celular = ''
     this.cbu = ''
     this.observacion = ''
     this.activo = ''
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    if(this.form.idconsignacion){
      this.update()
    }else{
      this.createConsignacion()
    }
    this.isVisible = false
  }

  initForm(){
    this.form = {
      codconsignacion:'',
      nombre: '',
      apellido: '',
      instagram: '',
      domicilio: '',
      celular: '',
      cbuAlias: '',
      observacion: '',
      activo: ''
    }
  }

  openModal(){
    this.initForm()
    this.isVisible = true
  }

  activarConsignacion(idconsignacion: string){
    this.consignacionServices.activarConsignacion(idconsignacion).subscribe(_=>{
      this.message.success('Consignacion activado')
      this.getConsignacion()
    })
  }

  desactivarConsignacion(idconsignacion: string){
    this.consignacionServices.desactivarConsignacion(idconsignacion).subscribe(_=>{
      this.message.success('Consignacion desactivado')
      this.getConsignacion()
    })
  }

  update(){
    this.consignacionServices.updateConsignacion(this.form).subscribe(_=>{
      this.message.success('Consignacion actualizado')
    })
  }

  edit(data: IConsignacion){
    this.form = data
    this.isVisible = true
  }

}




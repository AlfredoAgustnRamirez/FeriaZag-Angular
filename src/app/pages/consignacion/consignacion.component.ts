import { Component, OnInit } from '@angular/core';
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
import { IConsignacion } from './interfaces/consignacion.interface';
import { ConsignacionService } from './services/consignacion.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzMessageModule,
    NzPopconfirmModule,
    RouterModule,
  ],
  templateUrl: './consignacion.component.html',
  styleUrl: './consignacion.component.scss',
})
export class ConsignacionComponent implements OnInit {
  value: string = '';
  consignacion: IConsignacion[] = [];
  consignacionTmp: IConsignacion[] = [];
  form!: FormGroup;
  isVisible: boolean = false;
  idconsignacion: string = '';
  codconsignacion: string = '';
  nombre: string = '';
  apellido: string = '';
  instagram: string = '';
  domicilio: string = '';
  celular: string = '';
  cbu: string = '';
  observacion: string = '';
  activo: string = '';
  consignacionId?: string = '';
  valorinput1: string = '';
  valorinput2: string = '';
  init: boolean = false;

  constructor(
    private consignacionServices: ConsignacionService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {
    // Inicializa ventaTmp con tus datos originales (ejemplo)
    this.consignacionTmp = [
      { nombre: '', codconsignacion: '' },
      // Otros productos...
    ];
    // Inicializa venta con los datos originales al inicio
    this.consignacion = this.consignacionTmp;
    // Obtener el ID del usuario al inicializar el componente
    this.initForm();
  }

  ngOnInit() {
    this.getConsignacion();
  }

  getConsignacion() {
    this.consignacionServices
      .getConsignacion()
      .subscribe((consignacion: IConsignacion[]) => {
        this.consignacion = consignacion;
        this.consignacionTmp = consignacion;
      });
  }

  searchPorNombre() {
    this.consignacion = this.consignacionTmp.filter(
      (producto: IConsignacion) =>
        producto.nombre
          .toLocaleLowerCase()
          .indexOf(this.valorinput1.toLocaleLowerCase()) > -1
    );
  }

  searchPorCodCosignacion() {
    this.consignacion = this.consignacionTmp.filter(
      (producto: IConsignacion) =>
        producto.codconsignacion
          .toLocaleLowerCase()
          .indexOf(this.valorinput2.toLocaleLowerCase()) > -1
    );
  }
  createConsignacion() {
    this.consignacionServices
      .saveConsignacion(this.form.value)
      .subscribe((_) => {
        this.message.success('Consignacion guardado');
        this.getConsignacion();
        this.initForm();
        this.reset();
      });
  }

  reset() {
    this.codconsignacion = '';
    this.nombre = '';
    this.apellido = '';
    this.instagram = '';
    this.domicilio = '';
    this.celular = '';
    this.cbu = '';
    this.observacion = '';
    this.activo = '';
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk(){
    this.init = true
    if(this.form.valid){
        if(this.consignacionId){
          this.update()
       }else{
          this.createConsignacion()
    }
    this.isVisible = false
    }
   
  }

  initForm() {
    this.form = this.fb.group({
      idconsignacion: new FormControl(''),
      codconsignacion: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
        ]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      instagram: new FormControl('', [Validators.required]),
      domicilio: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11)
      ]),
      cbuAlias: new FormControl('', [Validators.required]),
      observacion: new FormControl('', [Validators.required]),
      activo: new FormControl('Si'),
    });
  }

  openModal() {
    this.initForm();
    this.isVisible = true;
  }

  activarConsignacion(idconsignacion: string) {
    this.consignacionServices
      .activarConsignacion(idconsignacion)
      .subscribe((_) => {
        this.message.success('Consignacion activado');
        this.getConsignacion();
      });
  }

  desactivarConsignacion(idconsignacion: string) {
    this.consignacionServices
      .desactivarConsignacion(idconsignacion)
      .subscribe((_) => {
        this.message.success('Consignacion desactivado');
        this.getConsignacion();
      });
  }

  update() {
    this.consignacionServices
      .updateConsignacion(this.form.value)
      .subscribe((_) => {
        this.message.success('Consignacion actualizado');
        this.getConsignacion()
        this.initForm();
      });
  }

  edit(data: IConsignacion) {
    this.consignacionId = this.idconsignacion;
    this.form.patchValue(data);
    this.isVisible = true;
  }

  get ConsignacionId(){
    return this.form.get('idconsignacion')
  }

  get CodConsignacionId(){
    return this.form.get('codconsignaicon')
  }

  get Nombre(){
    return this.form.get('nombre')
  }

  get Apellido(){
    return this.form.get('apellido')
  }

  get Instagram(){
    return this.form.get('instagram')
  }

  get Domicilio(){
    return this.form.get('domicilio')
  }

  get Celular(){
    return this.form.get('celular')
  }

  get CbuAlias(){
    return this.form.get('cbuAlias')
  }

  get Observacion(){
    return this.form.get('observacion')
  }

  get Activo(){
    return this.form.get('activo')
  }

}

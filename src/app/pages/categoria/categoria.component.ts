import { Component, OnInit } from '@angular/core'
import { CategoriaService } from './services/categoria.service';
import { ICategoria } from './interfaces/categoria.interface';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-categoria',
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
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  listOfData: ICategoria[] = []
  listOfDataTmp: ICategoria[] = []
  form!: ICategoria 
  isVisible: boolean = false
  value: string = ''
  idcategoria: string = ''
  nombre: string = ''
  activo: string = ''
  actionBtn: boolean = false

  constructor(
    private categoriaServices: CategoriaService,
    private message: NzMessageService,
    
  ){ }

  ngOnInit(){
    this.getCategoria()
    this.initForm()
  }

  initForm(){
    this.form = {
      nombre: '',
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
    if(this.form.idcategoria){
      this.update()
    }else{
      this.createCategoria()
    }
    this.isVisible = false
  }

  getCategoria(){
    this.categoriaServices.getCategoria().subscribe((consignacion: ICategoria[])=>{
      this.listOfData = consignacion
      this.listOfDataTmp = consignacion
    });
  }

  createCategoria(){
      this.categoriaServices.saveCategoria(this.form).subscribe(_=>{
      this.message.success('Categoria guardado')
      this.getCategoria()
      this.initForm()   
    })
  }

  activarCategoria(idcategoria: string){
    this.categoriaServices.activarCategoria(idcategoria).subscribe(_=>{
      this.message.success('Categoria activado')
      this.getCategoria()
    })
  }

  desactivarCategoria(idcategoria: string){
    this.categoriaServices.desactivarCategoria(idcategoria).subscribe(_=>{
      this.message.success('Categoria desactivado')
      this.getCategoria()
    })
}

  search(){
    this.listOfData = this.listOfDataTmp.filter((categoria: ICategoria)=> categoria.nombre.toLocaleLowerCase().indexOf(this.value.toLocaleLowerCase()) > -1) 
  }

  update(){
    this.categoriaServices.updateCategoria(this.form).subscribe(_=>{
      this.message.success('Categoria actualizado')
    })
  }

  edit(data: ICategoria){
    this.form = data
    this.isVisible = true
  }

}

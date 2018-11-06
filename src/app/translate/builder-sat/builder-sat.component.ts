import { Component, OnInit } from '@angular/core';
import { Builder } from '../../interfaces/builder';
import { DocumentSATComponent } from '../document-sat/document-sat.component';

@Component({
  selector: 'app-builder-sat',
  templateUrl: './builder-sat.component.html',
  styleUrls: ['./builder-sat.component.css']
})
export class BuilderSATComponent implements OnInit,Builder {

  documento:DocumentSATComponent;
  public cantidadReglas: number;

  constructor(documento:DocumentSATComponent) {
    this.documento = documento;
    this.cantidadReglas = 0;
  }

  ngOnInit() {
  }

  public agregarRegla(regla: string){
    this.documento.escribirRegla(regla);
    this.cantidadReglas ++ ;
  }

  public confeccionarCabecera(cantidadServicios:number):string{
    let cabecera:string;

    cabecera = 'p cnf ' + cantidadServicios + ' ' + this.cantidadReglas + '\n';

    return cabecera;
  }

  public finalizarCreacionDocumento(cantidadServicios:number,raices:string):string{

    let cabecera = this.confeccionarCabecera(cantidadServicios);

    return this.documento.finalizarDocumento(cabecera,raices);

  }




}

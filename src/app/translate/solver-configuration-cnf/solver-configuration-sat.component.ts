import { Component } from '@angular/core';
import { Builder } from '../../interfaces/builder';
import { DocumentSATComponent } from '../document-sat/document-sat.component';

@Component({
  selector: 'app-solver-configuration-sat',
  templateUrl: './solver-configuration-sat.component.html'
})
export class SolverConfigurationComponent implements Builder {

  documento: DocumentSATComponent;
  public cantidadReglas: number;

  constructor(documento: DocumentSATComponent) {
    this.documento = documento;
    this.cantidadReglas = 0;
  }


  public agregarRegla(regla: string) {
    this.documento.escribirRegla(regla);
    // this.cantidadReglas++;
  }

  public sumarCantidad() {
    this.cantidadReglas++;
    console.log('ENTRE ==================================================== ', this.cantidadReglas);
  }

  public confeccionarCabecera(cantidadServicios: number): string {
    let cabecera: string;

    cabecera = 'p cnf ' + cantidadServicios + ' ' + this.cantidadReglas + '\n';

    return cabecera;
  }

  public finalizarCreacionDocumento(cantidadServicios: number, raices: string): string {

    const cabecera = this.confeccionarCabecera(cantidadServicios);

    return this.documento.finalizarDocumento(cabecera, raices);

  }




}

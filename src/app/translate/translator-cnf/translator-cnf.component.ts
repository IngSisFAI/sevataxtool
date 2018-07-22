import { Component } from '@angular/core';
import { DocumentCreatorCNFComponent } from './document-creator-cnf/document-creator-cnf.component';

@Component({
  selector: 'app-translator-cnf',
  templateUrl: './translator-cnf.component.html'
})
export class TranslatorCNFComponent {
  servicios = [];
  cantServ = 0;
  salida = '';
  stringRaices = '';
  stringTemp = '';
  cantidadReglas = 0;

  constructor(private documentCreator: DocumentCreatorCNFComponent) {}

  /**
   * *Este metodo se encarga de recibir un JSON en el cual esta especificada la estructura de los servicios (DataSheet)
   * *y devuelve en CNF el analisis.
   * @param json Estructura de la dependencia de los servicios
   */
  traducirJson(json) {
    this.documentCreator.traducirJson(json);
    this.salida = this.documentCreator.obtenerSalida();
    return this.salida;
  }
}

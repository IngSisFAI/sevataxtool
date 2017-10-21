import {Document} from './document';
export interface Builder {

  documento:Document;
  cantidadReglas: number;
  agregarRegla(regla: string); //Metodo que recibe el resultado de la traduccion del Strategy, efectua algun computo si es necesario, y lo escribe en el documento.
  confeccionarCabecera(cantidadServicios:number):string;
  finalizarCreacionDocumento(cantidadServicios:number,raices:string):string; //Metodo a invocar cuando el strategy finaliza su operacion.

}

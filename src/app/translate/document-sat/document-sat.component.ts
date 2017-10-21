import { Component, OnInit } from '@angular/core';
import { Document } from '../../interfaces/document';

@Component({
  selector: 'app-document-sat',
  templateUrl: './document-sat.component.html',
  styleUrls: ['./document-sat.component.css']
})
export class DocumentSATComponent implements OnInit,Document {

  public stringCuerpo: string;
  public stringDocumento: string;


  constructor() {
    this.stringCuerpo = "";
  }

  ngOnInit() {
  }

  public escribirRegla(regla:string){
    this.stringCuerpo = this.stringCuerpo + regla;
  }

  public finalizarDocumento(cabecera:string,raices:string){
    this.stringDocumento = cabecera + raices + this.stringCuerpo;

    return this.stringDocumento;
  }
}

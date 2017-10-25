import { Component, OnInit } from '@angular/core';
import { StrategyCNFComponent } from './strategy-cnf/strategy-cnf.component';

import { StrategyUsComponent } from './strategy-us/strategy-us.component';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  salida: string = "";
  constructor(private strategyCnf: StrategyCNFComponent, private strategyUsComponent:StrategyUsComponent) {

  }

  ngOnInit() {
  }

  public generarEstructura(json){
    this.strategyUsComponent.generarEstructura(json);
  }

  traducirJson(json){
    this.strategyCnf.traducirJson(json);
    this.salida=this.strategyCnf.confeccionarStringFinal();
  }


}

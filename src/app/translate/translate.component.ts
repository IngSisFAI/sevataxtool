import { Component, OnInit } from '@angular/core';
import { StrategyCNFComponent } from './strategy-cnf/strategy-cnf.component';
import { Datasheet } from '../clases/Datasheet';
import { StrategyUsComponent } from './strategy-us/strategy-us.component';
import { StrategySOLVERComponent } from './strategy-solver/strategy-solver.component';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  salida: string = "";
  structureUnderlying:Datasheet= null;

  constructor(private strategyCnf: StrategyCNFComponent,
              private strategyUsComponent:StrategyUsComponent,
              private strategySOLVER:StrategySOLVERComponent) {

  }

  ngOnInit() {
  }

  public generarEstructura(json){
    this.structureUnderlying= this.strategyUsComponent.generarEstructura(json);
  }
  public analyse_self_dependency_bt(){
    this.salida = this.strategySOLVER.analyse_self_dependency(this.structureUnderlying);
  }
  public constraint_contradition_bt(){
    this.salida = this.strategySOLVER.analyse_constraint_contradition();
  }
  public alternative_inclusion_bt(){
    this.salida = this.strategySOLVER.analyse_alternative_inclusion(this.structureUnderlying);
  }
  public parent_exclusion_bt(){
    this.salida = this.strategySOLVER.analyse_parent_exclusion(this.structureUnderlying);
  }
  public parent_inclusion_bt(){
    this.salida = this.strategySOLVER.analyse_parent_inclusion(this.structureUnderlying);
  }

  traducirJson(json){
    this.strategyCnf.traducirJson(json);
    this.salida=this.strategyCnf.confeccionarStringFinal();
  }
  public getStructureUnderlying(){
    return this.structureUnderlying;

}
public getCnfCorpus(){
    return this.salida;
}
public getCnfHead(){
    return this.salida;
  }
  public getCnf(){
    return this.salida;
  }

}

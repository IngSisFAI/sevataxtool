import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslatorCNFComponent } from './translator-cnf/translator-cnf.component';
import { StrategySOLVERComponent } from './querys-cnf/strategy-solver.component';
import { Datasheet } from '../clases/Datasheet';


@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  salida = '';
  resultados = '';
  preResultados = '';
  structureUnderlying: Datasheet = null;
  // @ViewChild(StrategySOLVERComponent) StrategySOLVER: StrategySOLVERComponent;

  constructor(
    private translatorCnf: TranslatorCNFComponent,
    private strategySOLVER: StrategySOLVERComponent) {}

  ngOnInit() {}

  // public generarEstructura(json){
  //   this.structureUnderlying = this.strategyUsComponent.generarEstructura(json);
  // }

  public analyse_False_Optional_bt() {
    console.log('INIT FALSE OPTIONAL BT');
    console.log(this.salida);

    console.log('LALA: ');
    console.log(this.strategySOLVER);
    this.resultados = this.strategySOLVER.analyse_false_optional(
      this.salida,
      this.structureUnderlying
    );
  }
  public load_cnf() {
    this.salida = this.preResultados;
  }
  // public analyse_self_dependency_bt(){
  //   this.resultados = this.strategySOLVER.analyse_self_dependency(this.structureUnderlying);
  // }
  // public constraint_contradition_bt(){
  //   this.resultados = '';
  //   this.resultados = this.strategySOLVER.analyse_constraint_contradition(this.structureUnderlying);
  // }
  // public alternative_inclusion_bt(){
  //   this.resultados = '';
  //   this.resultados = this.strategySOLVER.analyse_alternative_inclusion(this.structureUnderlying);
  // }
  // public parent_exclusion_bt(){
  //   this.resultados = '';
  //   this.resultados = this.strategySOLVER.analyse_parent_exclusion(this.structureUnderlying);
  // }
  // public mandatory_exclusion_bt(){
  //   this.resultados = '';
  //   this.resultados = this.strategySOLVER.analyse_mandatory_exclusion(this.structureUnderlying);
  // }
  // public mandatory_inclusion_bt(){
  //   this.resultados = '';
  //   this.resultados = this.strategySOLVER.analyse_mandatory_inclusion(this.structureUnderlying);
  // }
  // transitive_inconsistency_bt(){
  //   this.resultados = '';
  //   this.resultados = this.strategySOLVER.analyse_transitive_inconsistency(this.structureUnderlying);
  // }
  // transitive_redundancy_bt(){
  //   this.resultados = '';
  //   this.resultados = this.strategySOLVER.analyse_transitive_redundancy(this.structureUnderlying);
  // }
  // public parent_inclusion_bt(){
  //   this.resultados = '';
  //   this.resultados = this.strategySOLVER.analyse_parent_inclusion(this.structureUnderlying);
  // }
  public run_sat_solver(cnf) {
    this.salida = cnf;
  }

  traducirJson(json) {
    // this.strategyCnf.traducirJson(json);
    this.salida = '';
    this.salida = this.translatorCnf.traducirJson(json);
  }
  public getStructureUnderlying() {
    return this.structureUnderlying;
  }
  public getCnfCorpus() {
    return this.salida;
  }
  public getCnfHead() {
    return this.salida;
  }
  public getCnf() {
    return this.salida;
  }
}

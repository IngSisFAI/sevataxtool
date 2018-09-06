import { Component, OnInit } from '@angular/core';

import { Datasheet } from '../clases/Datasheet';
import { Service } from '../clases/Service';
import { DocumentCreatorCNFComponent } from '../translate/translator-cnf/document-creator-cnf/document-creator-cnf.component';
import { TranslateComponent} from '../translate/translate.component';



@Component({
  selector: 'app-solver-scenarios',
  templateUrl: './solver-scenarios.component.html',
  styleUrls: ['./solver-scenarios.component.css']
})
export class SolverScenariosComponent implements OnInit {

  public cnf;
  public underlineStructure;
  public cabecera;
  public cantReglas;
  public stringReglas;
  public traduccionCNF;
  public outResults;

  constructor(private documentCreatorCNF: DocumentCreatorCNFComponent, private trasnlateComponent: TranslateComponent) { }

  ngOnInit() {
    // Cabecera.
    // Cantidad Reglas.
    // StringRaices.
    // Reglas.
    // Traduccion.
    // Underline.

  }


  public ejecutarEscenarios(ds: Datasheet[]){
    this.traduccionCNF = this.documentCreatorCNF.obtenerSalida(); // TODO: Revisar si esto va aca o en otro lado.


    for (let i = 0; i < ds.length; i++) {
        const serviciosDs = ds[i].getServices();
        for (let j = 0; j < serviciosDs.length; j++) { // Para cada raiz hago algo.

          // this.recorrerVariationPoints(serviciosDs[j]);
          this.recorrerServicio(serviciosDs[i]);
        }
    }
  }

  private recorrerServicio(serv: Service){

    this.recorrerVariationPoints(serv);
    this.recorrerDependecies(serv);


  }

  private recorrerVariationPoints(serv: Service){

    const vpList = serv.getVariationPoints();
    for (let i = 0; i < vpList.length; i++) {
        const variabilityType = vpList[i].getVariabilityType();

          const variantList = vpList[i].getVariants();
          this.recorrerVariantes(variantList, variabilityType);


        // TODO: Agregar para los diferetnes tipos de variabilidad!
    }
  }

  private recorrerDependecies(serv: Service){

    const dpList = serv.getDependencies();

    for (let i = 0; i < dpList.length; i++) {
        dpList[i];
    }
  }

  private recorrerVariantes(variantList: Service[], variabilityType: String){

    for (let i = 0; i < variantList.length; i++) {
        // variantList[i];

        // Aca agregamos los escenarios de test.

        if (variabilityType !== 'MandatoryVP'){ // ESto sigfica q tiene q ser OptionalVP o AlternativeVP o VariantVP
          this.gs_me_FalseOptional(variantList[i]);

        }

        // Sigo recorriendo la estructura.
        this.recorrerServicio(variantList[i]);
    }


  }


  public analyse_FalseOptional(){


    const StrcUnder = this.trasnlateComponent.getStructureUnderlying();
    StrcUnder.getServices();

  }


  public analyse_self_dependency(){

    this.outResults = '';
    const StrcUnder = this.trasnlateComponent.getStructureUnderlying();
    const services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      this.gs_me_SelfDependency(services[i]);
    }
    return this.outResults;
  }



  public gs_me_FalseOptional(service: Service){
   // TODO: Traer la traduccion CNF aqui.
   // TODO: Buscar el numero del servicio en CNF, negarlo y evaluar

   const numServicio = this.documentCreatorCNF.devolverNumeroServicio(service.getName());


   console.log('Imprimir resultado final del FalseOptional AQUI');
  }

  public gs_me_SelfDependency(serv: Service){

    const dependencies = serv.getDependencies();
    const nombre = serv.getName();

    for (let i = 0; i < dependencies.length; i++) {
        const sv = dependencies[i].getService();

        const nombreAux = sv.getName();

        if (nombre === nombreAux ){

          console.log('el servicio ', nombre , ' tiene una SelfDependency!!! \0');
          this.outResults = this.outResults + ' \'\n\'' + 'el servicio ' + nombre + ' tiene una SelfDependency!!! \0';

        }else {
          this.gs_me_SelfDependency(sv);
        }


    }


  }


}

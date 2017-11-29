import { Component, OnInit } from '@angular/core';

import { Datasheet } from '../../clases/Datasheet';
import { Service } from '../../clases/Service';
import { StrategyCNFComponent } from '../strategy-cnf/strategy-cnf.component';
import { StrategyUsComponent } from '../strategy-us/strategy-us.component';



@Component({
  selector: 'app-strategy-solver',
  templateUrl: './strategy-solver.component.html',
  styleUrls: ['./strategy-solver.component.css']
})
export class StrategySOLVERComponent implements OnInit {



  public cnf;
  public underlineStructure;
  public cabecera;
  public cantReglas;
  public stringReglas;
  public traduccionCNF;
  public outResults;

  constructor(private strategyCnf: StrategyCNFComponent, private strategyUsComponent:StrategyUsComponent) { }

  ngOnInit() {
    //Cabecera.
    //Cantidad Reglas.
    // StringRaices.
    // Reglas.
    // Traduccion.
    //Underline.

  }


  public ejecutarEscenarios(ds:Datasheet[]){
    this.traduccionCNF = this.strategyCnf.obtenerSalida(); //TODO: Revisar si esto va aca o en otro lado.


    for (let i = 0; i < ds.length; i++) {
      let serviciosDs = ds[i].getServices();
      for (let j = 0; j < serviciosDs.length; j++) { //Para cada raiz hago algo.

        // this.recorrerVariationPoints(serviciosDs[j]);
        this.recorrerServicio(serviciosDs[i]);
      }
    }
  }

  private recorrerServicio(serv:Service){

    this.recorrerVariationPoints(serv);
    this.recorrerDependecies(serv);


  }

  private recorrerVariationPoints(serv:Service){

    let vpList = serv.getVariationPoints();
    for (let i = 0; i < vpList.length; i++) {
      let variabilityType = vpList[i].getVariabilityType();

      let variantList = vpList[i].getVariants();
      this.recorrerVariantes(variantList,variabilityType);


      //TODO: Agregar para los diferetnes tipos de variabilidad!
    }
  }

  private recorrerDependecies(serv:Service){

    let dpList = serv.getDependencies();

    for (let i = 0; i < dpList.length; i++) {
      dpList[i];
    }
  }

  private recorrerVariantes(variantList:Service[], variabilityType:String){

    for (let i = 0; i < variantList.length; i++) {
      // variantList[i];

      //Aca agregamos los escenarios de test.

      if(variabilityType != 'MandatoryVP'){ //ESto sigfica q tiene q ser OptionalVP o AlternativeVP o VariantVP
        this.gs_me_FalseOptional(variantList[i]);

      }

      //Sigo recorriendo la estructura.
      this.recorrerServicio(variantList[i]);
    }


  }


  public analyse_FalseOptional(){


   // var StrcUnder = this.trasnlateComponent.getStructureUnderlying();
    //StrcUnder.getServices();

  }


  public analyse_self_dependency(datasheet:Datasheet){

    console.log("INIT SELF DEPENDENCY");
    this.outResults = "";
    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      this.gs_me_SelfDependency(services[i])
    }
    return this.outResults;
  }
  public analyse_constraint_contradition(){


    return "";
  }
  public analyse_alternative_inclusion(datasheet:Datasheet){

    console.log("INIT ALTERNATIVE INCLUSION ");
    this.outResults = "";
    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      this.gs_ds_alternative_inclusion(services[i])
    }
    return this.outResults;
  }

  public analyse_parent_exclusion(datasheet:Datasheet){

    console.log("INIT PARENT EXCLUSION");
    this.outResults = "";

    let chequed_services:String[]=  new Array();
    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      let service = services[i];
      chequed_services.push(service.getName());
      this.gs_ds_parent_exclusion(services[i],chequed_services)
    }
    return this.outResults;
  }
  public analyse_parent_inclusion(datasheet:Datasheet){

    console.log("INIT PARENT INCLUSION");
    this.outResults = "";

    let chequed_services:String[]=  new Array();
    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      let service = services[i];
      chequed_services.push(service.getName());
      this.gs_ds_parent_inclusion(services[i],chequed_services)
    }
    return this.outResults;
  }

  //-------------------------------------------------------------------------

  public is_children(parent:Service,child:Service){
    let isChild = false;

    let variantPoints = parent.getVariationPoints();
    let nombrehijo = child.getName();


    for (let i = 0; i < variantPoints.length; i++) {
      let vP = variantPoints[i].getVariants();
      for (let x = 0; x < vP.length; x++) {
        if (!isChild) {

          let serviceHijo_AUX = vP[x];
          let nombreAUX = serviceHijo_AUX.getName();
          console.log("comparanto ",nombrehijo ," con ", nombreAUX);

          if(nombreAUX == nombrehijo ){
            isChild=true;

          }else{
            isChild= this.is_children(serviceHijo_AUX,child);
          }


        }
      }
    }
    return isChild;
  }

  public gs_ds_parent_exclusion(serv:Service,chequed_services:String[]){

    let dependencies = serv.getDependencies();
    let variantPoints = serv.getVariationPoints();
    let nombrehijo = serv.getName();


    for (let i = 0; i < dependencies.length; i++) {
      let dep_Type = dependencies[i].getDependencyType();

      let parent = dependencies[i].getService();
      let nombrepadre = parent.getName();
      if (dep_Type.toString() == "Exclude"){

        if (this.is_children(parent,serv))
        {
          console.log("el servicio ",nombrehijo ," tiene una ParentExclusion con ", nombrepadre);
          this.outResults = this.outResults + " '\n'" + "el servicio "+ nombrehijo + " tiene una ParentExclusion con "+ nombrepadre+"!!! ";
        }
      }else{
        if (chequed_services.indexOf(nombrepadre) < 0){
          chequed_services.push(nombrepadre);
          this.gs_ds_parent_exclusion(parent,chequed_services);
        }

      }
    }

    for (let i = 0; i < variantPoints.length; i++) {
      let vP = variantPoints[i].getVariants();
      for (let x = 0; x < vP.length; x++) {
        let vPserv = vP[x];
        let nomrbrevPserv = vPserv.getName();
        if (chequed_services.indexOf(nomrbrevPserv) < 0){
          chequed_services.push(nomrbrevPserv);
          this.gs_ds_parent_exclusion(vPserv,chequed_services);
        }

      }
    }


  }

  public gs_ds_parent_inclusion(serv:Service,chequed_services:String[]){

    let dependencies = serv.getDependencies();
    let variantPoints = serv.getVariationPoints();
    let nombrehijo = serv.getName();


    for (let i = 0; i < dependencies.length; i++) {
      let dep_Type = dependencies[i].getDependencyType();

      let parent = dependencies[i].getService();
      let nombrepadre = parent.getName();
      if (dep_Type.toString() != "Exclude"){

        if (this.is_children(parent,serv))
        {
          console.log("el servicio ",nombrehijo ," tiene una ParentInclusion con ", nombrepadre);
          this.outResults = this.outResults + " '\n'" + "el servicio "+ nombrehijo + " tiene una ParentInclusion con "+ nombrepadre+"!!! ";
        }
      }else{
        if (chequed_services.indexOf(nombrepadre) < 0){
          chequed_services.push(nombrepadre);
          this.gs_ds_parent_inclusion(parent,chequed_services);
        }

      }
    }

    for (let i = 0; i < variantPoints.length; i++) {
      let vP = variantPoints[i].getVariants();
      for (let x = 0; x < vP.length; x++) {
        let vPserv = vP[x];
        let nomrbrevPserv = vPserv.getName();
        if (chequed_services.indexOf(nomrbrevPserv) < 0){
          chequed_services.push(nomrbrevPserv);
          this.gs_ds_parent_inclusion(vPserv,chequed_services);
        }

      }
    }


  }




  public gs_ds_alternative_inclusion(serv:Service){


    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();


    for (let i = 0; i < variantPoints.length; i++) {
      let vP_type = variantPoints[i].getVariabilityType();
      if (vP_type =="AlternativeVP"){
        console.log("INIT ALTERNATIVE INCLUSION VARIANT ");

        let vP = variantPoints[i].getVariants();
        for (let x = 0; x < vP.length; x++) {
          let vPserv_destino = vP[x];

          for (let y = 0; y < vP.length; y++) {
            if (y != x){
              let vPserv_inicio = vP[y];

              this.gs_ds_alternative_variant_inclusion(vPserv_inicio,vPserv_destino)
            }
          }
        }
      }
    }
  }


  public gs_ds_alternative_variant_inclusion(serv_inicio:Service,serv_fin:Service ){



    let dependencies = serv_inicio.getDependencies();
    let variantPoints = serv_inicio.getVariationPoints();
    let nombreinicio = serv_inicio.getName();
    let nombrefin = serv_fin.getName();
    console.log("INIT alternative_vatiant - ",nombreinicio," - ", nombrefin);


    for (let i = 0; i < dependencies.length; i++)
    {
      let dep_Type = dependencies[i].getDependencyType();
      console.log("INIT alternative_vatiant - ",dep_Type);

      if (dep_Type.toString() == "Require"){
        console.log("si señor 1");
        let sv = dependencies[i].getService();
        let nombreAux = sv.getName();

        if(nombrefin == nombreAux ){
          console.log("si señor");
          console.log("el servicio ",nombreinicio ," tiene una AlternativeVariantInclusion con ", nombrefin);

          this.outResults = this.outResults + " '\n'" + "el servicio "+ nombreinicio + " tiene una AlternativeVariantInclusion con "+ nombrefin+"!!! ";
        }
      }
      if (dep_Type.toString() == "Use"){
        let sv = dependencies[i].getService();
        let nombreAux = sv.getName();
        if(nombrefin == nombreAux ){
          console.log("el servicio ",nombreinicio ," tiene una AlternativeVariantInclusion con ", nombrefin);
          this.outResults = this.outResults + " '\n'" + "el servicio "+ nombreinicio + " tiene una AlternativInclusion con "+ nombrefin+"!!! ";
        }
      }
      if (dep_Type.toString() == "Exclude"){
        let sv = dependencies[i].getService();
        let nombreAux = sv.getName();
        if(nombrefin == nombreAux ){
          console.log("el servicio ",nombreinicio ," tiene una AlternativeVariantExclusion con ", nombrefin);
          this.outResults = this.outResults + " '\n'" + "el servicio "+ nombreinicio + " tiene una AlternativeExclusion con "+ nombrefin+"!!! ";
        }
      }

    }

    for (let i = 0; i < variantPoints.length; i++) {
      let vP = variantPoints[i].getVariants();
      for (let x = 0; x < vP.length; x++) {
        let vPserv = vP[x];
        this.gs_ds_alternative_variant_inclusion(vPserv,serv_fin)
      }
    }


  }





  public gs_me_FalseOptional(service:Service){
    //TODO: Traer la traduccion CNF aqui.
    //TODO: Buscar el numero del servicio en CNF, negarlo y evaluar

    let numServicio = this.strategyCnf.devolverNumeroServicio(service.getName());


    console.log("Imprimir resultado final del FalseOptional AQUI");
  }




  public gs_me_SelfDependency(serv:Service){

    let dependencies = serv.getDependencies();
    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();
    console.log("INIT SELF DEPENDENCY - ",nombre);

    for (let i = 0; i < dependencies.length; i++) {
      let sv = dependencies[i].getService();

      let nombreAux = sv.getName();

      if(nombre == nombreAux ){
        console.log("MODIFICAR STRING ", nombreAux, " - ", nombre);



        this.outResults = this.outResults + " '\n'" + "el servicio "+ nombre + " tiene una SelfDependency!!! \0";

      }else {
        this.gs_me_SelfDependency(sv)
      }


    }

    for (let i = 0; i < variantPoints.length; i++) {
      let vP = variantPoints[i].getVariants();
      for (let x = 0; x < vP.length; x++) {

        let vPserv = vP[x];
        this.gs_me_SelfDependency(vPserv)
      }
    }


    }


  public gs_ds_ConstraintContradition(serv:Service){

  }


}



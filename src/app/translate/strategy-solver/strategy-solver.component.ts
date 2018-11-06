import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Datasheet } from '../../clases/Datasheet';
import { Service } from '../../clases/Service';
import { StrategyCNFComponent } from '../strategy-cnf/strategy-cnf.component';
import { StrategyUsComponent } from '../strategy-us/strategy-us.component';


declare var $: any;

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

  public outResults;
  public Module;
  view_services:String[];


  //@ViewChild('solverView') solverVar : ElementRef;


  constructor(private strategyCnf: StrategyCNFComponent,
              private strategyUsComponent:StrategyUsComponent) { }

  ngOnInit() {

    this.Module = {
      noInitialRun : true,
      'print': function(text) {
        var element = document.getElementById('solver_output');
        element.innerHTML += text.replace('\n', '<br>', 'g') + '<br>';

        //console.log(text);
      }
    };

    //Cabecera.
    //Cantidad Reglas.
    // StringRaices.
    // Reglas.
    // Traduccion.
    //Underline.

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
        //this.gs_me_FalseOptional("", variantList[i]);

      }

      //Sigo recorriendo la estructura.
      this.recorrerServicio(variantList[i]);
    }


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

  public analyse_false_optional(cnf:String, datasheet:Datasheet){

    console.log("INIT FALSE OPTIONAL");
    this.outResults = "";
    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      console.log("INIT FALSE OPTIONAL",services[i].getName());
      this.gs_me_FalseOptional(cnf, services[i])
    }

    return this.outResults;



  }

  public gs_me_FalseOptional(cnf:String, serv:Service){

    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();
    let numServicio = this.strategyCnf.devolverNumeroServicio(serv.getName());


    for (let i = 0; i < variantPoints.length; i++) {
      let vP_type = variantPoints[i].getVariabilityType();
      if (vP_type !="MandatoryVP"){
        console.log("INIT FALSE OPTIONAL - VARIANT POINT");

        let vP = variantPoints[i].getVariants();
        for (let x = 0; x < vP.length; x++) {
             let vPserv = vP[x];

             this.analyze_solver(serv,vPserv,cnf);
             this.gs_me_FalseOptional( cnf,vPserv)


        }
          }
        }
  }

  public analyze_solver( father:Service,child:Service,cnf:String){

    var cnfCadena = cnf.split('\n');
    console.log(cnfCadena)

    var cnfResult= "";
    for (let x = 1; x < cnfCadena.length; x++) {
      cnfResult = cnfResult + cnfCadena[x]  +  '\n';
    }

    console.log(cnfCadena)
    var numero = cnfCadena[0].split(" ");
    console.log(numero[3])
    var cant = parseInt(numero[3]) + 2;
    console.log(cant)
    var cnfPreResult =  numero[0] + " " + numero[1] + " " +numero[2] + " " + cant +'\n'
        + this.strategyCnf.devolverNumeroServicio(father.getName())
                        + " 0" + '\n'
      + "-"
      + this.strategyCnf.devolverNumeroServicio(child.getName())
                        + " 0" + '\n';

    this.outResults = this.outResults + '\n' + "falso opcional de " + child.getName() + '\n'+
      "----------------------" + '\n'+   cnfPreResult + cnfResult;


  }



  //-------------------------------------------------------------------------
  // SELF DEPENDENCY
  public gs_me_SelfDependency(serv:Service){

    let dependencies = serv.getDependencies();
    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();
    console.log("INIT SELF DEPENDENCY - ",nombre);
    console.log("DEPENDENCIES de - ",nombre," son", dependencies);

    for (let i = 0; i < dependencies.length; i++) {
      let sv = dependencies[i].getService();
      console.log("obtiene - ",sv);
      let nombreAux = sv.getName();

      if(nombre == nombreAux ){
        console.log("Self dependency ", nombreAux );
        this.outResults = this.outResults + " el servicio "+ nombre + " tiene una SelfDependency!!! "+ '\n';

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


  //-------------------------------------------------------------------------
  // ALTERNATIVE INCLUSION y Exclusion


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

  public gs_ds_alternative_inclusion(serv:Service){

    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();
    console.log("INIT GS DS ALTERNATIVE INCLUSION ",nombre);


    for (let i = 0; i < variantPoints.length; i++) {

      let vP_type = variantPoints[i].getVariabilityType();
      console.log(nombre, " CHECK ALTERNATIVE TyPE ", vP_type);

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

        console.log("Continue ALTERNATIVE INCLUSION ");
        let vP = variantPoints[i].getVariants();
        for (let i = 0; i < vP.length; i++) {
          this.gs_ds_alternative_inclusion(vP[i])
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


  //-------------------------------------------------------------------------
  // PARENT INCLUSION

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

  //-------------------------------------------------------------------------
  // PARENT Exclusion

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
          this.outResults = this.outResults + '\n' + "el servicio "+ nombrehijo + " tiene una ParentExclusion con "+ nombrepadre+"!!! ";
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
  //-------------------------------------------------------------------------
  // MANDATORY Exclusion

  private getMandatoryList(serv: Service, mandatory_services:String[]) {


    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();

    console.log("Finding Mandatory Service ",nombre);


    for (let i = 0; i < variantPoints.length; i++) {

      let vP_type = variantPoints[i].getVariabilityType();
      console.log(nombre, " CHECK ALTERNATIVE TyPE ", vP_type);

      if (vP_type =="MandatoryVP"){
        console.log("FIND MANDATORY VARIANT ");

        let vP = variantPoints[i].getVariants();
        for (let x = 0; x < vP.length; x++) {
          mandatory_services.push(vP[x].getName());
        }
      }

      console.log("Continue  FIND MANDATORY SERV ");
      let vP = variantPoints[i].getVariants();
      for (let i = 0; i < vP.length; i++) {
        this.getMandatoryList(vP[i],mandatory_services)
      }

    }



  }

  public analyse_mandatory_exclusion(datasheet:Datasheet){

    console.log("INIT Mandatory EXCLUSION");

    let mandatory_services:String[]=  new Array();
    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      let service = services[i];
      mandatory_services.push(service.getName());
      this.getMandatoryList(service, mandatory_services);
      }


    console.log(" Mandatory LIST" , mandatory_services);

     //------
    this.outResults = "";


    var StrcUnder2 = datasheet;
    var services2 = StrcUnder2.getServices();

    for (let i = 0; i < services2.length; i++) {
      let service = services2[i];
      this.gs_ds_mandatory_exclusion(service,mandatory_services)
    }
    return this.outResults;

  }


  public gs_ds_mandatory_exclusion(serv:Service,mandatory_services:String[]){

    let dependencies = serv.getDependencies();
    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();
    console.log("chequeando Mandatory", nombre);

    for (let i = 0; i < dependencies.length; i++) {
      let dep_Type = dependencies[i].getDependencyType();
      let servChild = dependencies[i].getService();
      let nombreChild = servChild.getName();
      if (dep_Type.toString() == "Exclude"){

        console.log(nombre, mandatory_services.lastIndexOf(nombreChild) , nombreChild );
        if (mandatory_services.lastIndexOf(nombreChild)>= 0)
        {
          console.log("el servicio ",nombre ," tiene una Mandatory Exclusion con ", nombreChild);
          this.outResults = this.outResults + '\n' + "el servicio "+nombre +" tiene una Mandatory Exclusion con "+ nombreChild + "!!! ";
        }
      }
    }

    for (let i = 0; i < variantPoints.length; i++) {
      let vP = variantPoints[i].getVariants();
      for (let x = 0; x < vP.length; x++) {
        let vPserv = vP[x];
        this.gs_ds_mandatory_exclusion(vPserv,mandatory_services);


      }
    }


  }

  //-------------------------------------------------------------------------
  // MANDATORY Exclusion


  public analyse_mandatory_inclusion(datasheet:Datasheet){

    console.log("INIT Mandatory INCLUSION");

    let mandatory_services:String[]=  new Array();
    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      let service = services[i];
      mandatory_services.push(service.getName());
      this.getMandatoryList(service, mandatory_services);
    }

    console.log(" Mandatory LIST" , mandatory_services);

    //------
    this.outResults = "";


    var StrcUnder2 = datasheet;
    var services2 = StrcUnder2.getServices();

    for (let i = 0; i < services2.length; i++) {
      let service = services2[i];
      this.gs_ds_mandatory_inclusion(service,mandatory_services)
    }
    return this.outResults;

  }


  public gs_ds_mandatory_inclusion(serv:Service,mandatory_services:String[]){

    let dependencies = serv.getDependencies();
    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();
    console.log("chequeando Mandatory", nombre);

    for (let i = 0; i < dependencies.length; i++) {
      let dep_Type = dependencies[i].getDependencyType();
      let servChild = dependencies[i].getService();
      let nombreChild = servChild.getName();
      console.log(nombre, mandatory_services.lastIndexOf(nombreChild) , nombreChild ,  dep_Type.toString()  );
      if (dep_Type.toString() == "Require"){

        console.log(nombre, mandatory_services.lastIndexOf(nombreChild) , nombreChild );
        if (mandatory_services.lastIndexOf(nombreChild)>= 0)
        {
          console.log("el servicio ",nombre ," tiene una Mandatory Inclusion con ", nombreChild);
          this.outResults = this.outResults + '\n' + "el servicio "+nombre +" tiene una Mandatory Inclusion con "+ nombreChild + "!!! ";
        }
      }
    }
   for (let i = 0; i < variantPoints.length; i++) {
      let vP = variantPoints[i].getVariants();
      for (let x = 0; x < vP.length; x++) {
        let vPserv = vP[x];
        this.gs_ds_mandatory_inclusion(vPserv,mandatory_services);
      }
    }
  }



  //------------------------------------------------------------------------
  // CONSTRAINT CONTRADITION

  //constraint_Contradiction (A ,B):
  // If " not (A) not (B)" belong_to CNF ?
  // If (" not (A) B ")
  // or (" A not (B) ") belong_to CNF ?
  // return Constraint Contradition

  public analyse_constraint_contradition( datasheet:Datasheet){

    console.log("INIT constrant contradition");
    this.outResults = "";

    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      this.gs_ds_ConstraintContradition(services[i])
    }

    return this.outResults;
  }

  public gs_ds_ConstraintContradition(serv:Service){

    let dependencies = serv.getDependencies();
    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();

    console.log("INIT Constraint Contradition - ",nombre);

    for (let i = 0; i < dependencies.length; i++) {
      let sv = dependencies[i].getService();
      let depType = dependencies[i].getDependencyType();
      let nombreAux = sv.getName();

      console.log("CC whit - ",nombreAux );

      if (this.gs_ds_compare_CC(sv,nombre, depType)){

        console.log("CC between" ,  nombre, " and ", nombreAux );
        this.outResults = this.outResults + " '\n'" + "el servicio "+ nombre + " tiene una Constraint Contradition con "+ nombreAux +"!!! ";

      }
    }

    for (let i = 0; i < variantPoints.length; i++) {
      let vP = variantPoints[i].getVariants();
      for (let x = 0; x < vP.length; x++) {

        let vPserv = vP[x];
        this.gs_ds_ConstraintContradition(vPserv)
      }
    }


  }

  public gs_ds_compare_CC(serv:Service, nombre_serv:string , first_depType:string){

    console.log("inciar comparacion entre ", serv, " -- y ", nombre_serv, " con ",  first_depType);
    let dependencies = serv.getDependencies();
    let nombre = serv.getName();
    let result = false ;

    for (let i = 0; i < dependencies.length; i++) {
      let sv = dependencies[i].getService();
      let depType = dependencies[i].getDependencyType();
      let nombreAux = sv.getName();

      if (nombreAux== nombre_serv){
        if (depType != first_depType){
          result = true;
        }
      }
    }

    return result;
  }

  //------------------------------------------------------------------------
  // Transitive Inconsistency

  //Services_Excludes (A ,B):
  //Include_List =[ B]
  //Repeat S in Include_List
  // For All A
  // if ( S_aux Includes B)
  //  Include_List . add ( S_aux )
  //      until Include_List unchange
  // If A belong_to Include_list
  //       return transitive Incosnsitency

  public analyse_transitive_inconsistency(datasheet:Datasheet){

    console.log("INIT Transitivy redundancy");

    this.view_services =  new Array();
    this.outResults = "";

    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      this.r_ds_transitive_inconsistency(services[i])
    }

    return this.outResults;
  }
  //------------------------------------------------------------------------
  // Transitive Redundancy

  public analyse_transitive_redundancy(datasheet:Datasheet){

    console.log("INIT Transitivy redundancy");

    this.view_services =  new Array();
    this.outResults = "";

    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      this.r_ds_transitive_redundancy(services[i])
    }

    return this.outResults;
  }

  public r_ds_transitive_inconsistency(serv:Service){


    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();
    console.log("analize Transitivy inconsistency", nombre);

    if (this.view_services.lastIndexOf(nombre)<0){


    this.view_services.push(nombre);
    let require_services:String[]=  new Array();
    this.service_transitive_inconsistency_get_requires(serv, require_services);
    console.log("arreglo de requiere de : ",nombre," -->", require_services);
    this.service_transitive_inconsistency(serv, require_services,nombre);

    for (let i = 0; i < variantPoints.length; i++) {
      let vP = variantPoints[i].getVariants();
      for (let x = 0; x < vP.length; x++) {
        let vPserv = vP[x];
        this.r_ds_transitive_inconsistency(vPserv);
      }
      }
    }
  }
 public r_ds_transitive_redundancy(serv:Service){


    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();
    console.log("analize Transitivy redundancy", nombre);

    if (this.view_services.lastIndexOf(nombre)<0){


    this.view_services.push(nombre);
    let require_services:String[]=  new Array();
    this.service_transitive_redundancy(serv, require_services,nombre);

    for (let i = 0; i < variantPoints.length; i++) {
      let vP = variantPoints[i].getVariants();
      for (let x = 0; x < vP.length; x++) {
        let vPserv = vP[x];
        this.r_ds_transitive_redundancy(vPserv);
      }
      }
    }
  }

  public service_transitive_inconsistency_get_requires(serv:Service,require_services:String[]){

    let dependencies = serv.getDependencies();
    let nombre = serv.getName();
    console.log(" init find T I ", nombre);

    for (let i = 0; i < dependencies.length; i++) {

      let dep_Type = dependencies[i].getDependencyType();
      let servChild = dependencies[i].getService();
      let nombreChild = servChild.getName();

      console.log("get lista requires con ", nombreChild);

      if (dep_Type.toString() == "Require"){

        if (require_services.lastIndexOf(nombreChild)>= 0)
        {  }
        else {
          require_services.push(servChild.getName());
          this.service_transitive_inconsistency_get_requires(servChild, require_services);
          this.r_ds_transitive_inconsistency(servChild);
        }
      }
    }
  }

  public service_transitive_inconsistency(serv:Service,require_services:String[],servCheck:string){

    let dependencies = serv.getDependencies();
    let nombre = serv.getName();
    console.log(" init find ", nombre);

    for (let i = 0; i < dependencies.length; i++) {

      let dep_Type = dependencies[i].getDependencyType();
      let servChild = dependencies[i].getService();
      let nombreChild = servChild.getName();

      console.log("check transitive inconsistency con ", nombreChild);

      if (dep_Type.toString() == "Exclude"){

        if (require_services.lastIndexOf(nombreChild)>= 0)
        {
          console.log("el servicio ",nombre ," tiene una transitive inconsistency con ", nombreChild);
          this.outResults = this.outResults + '\n' + "el servicio "+ nombre +" tiene una transitive inconsistency con "+ nombreChild +"!!" ;

        }
        else {
        //  require_services.push(servChild.getName());
          console.log("llama con ",servCheck, servChild);
          this.service_transitive_inconsistency_require_of_Includes(servChild, require_services,servCheck);
          this.r_ds_transitive_inconsistency(servChild);
        }
      }

    }
  }


  public service_transitive_inconsistency_require_of_Includes(serv:Service,require_services:String[],servCheck:string){

    let dependencies = serv.getDependencies();
    let nombre = serv.getName();
    console.log(" init find ", nombre);

    for (let i = 0; i < dependencies.length; i++) {

      let dep_Type = dependencies[i].getDependencyType();
      let servChild = dependencies[i].getService();
      let nombreChild = servChild.getName();

      console.log("check transitive redundancy con ", nombreChild);

      if (dep_Type.toString() == "Require"){

        if (require_services.lastIndexOf(nombreChild)>= 0)
        {
          console.log("el servicio ",servCheck ," tiene una transitive inconsistency  BBB con ", nombreChild);
          this.outResults = this.outResults + '\n' + "el servicio "+ servCheck +" tiene una transitive inconsistency BB con "+ nombreChild +"!!" ;

        }
        else {
          //require_services.push(servChild.getName());
          console.log("llama con ",servCheck, servChild);
          this.service_transitive_inconsistency_require_of_Includes(servChild, require_services,servCheck);
          this.r_ds_transitive_inconsistency(servChild);
        }
      }
      else{
        this.r_ds_transitive_inconsistency(servChild);
      }
    }
  }
  public service_transitive_redundancy(serv:Service,require_services:String[],servCheck:string){

    let dependencies = serv.getDependencies();
    let nombre = serv.getName();
    console.log(" init find ", nombre);

    for (let i = 0; i < dependencies.length; i++) {

      let dep_Type = dependencies[i].getDependencyType();
      let servChild = dependencies[i].getService();
      let nombreChild = servChild.getName();

      console.log("check transitive redundancy con ", nombreChild);

      if (dep_Type.toString() == "Require"){

        if (require_services.lastIndexOf(nombreChild)>= 0)
        {
          console.log("el servicio ",nombre ," tiene una transitive redundancy con ", nombreChild);
          this.outResults = this.outResults + '\n' + "el servicio "+ nombre +" tiene una transitive redundancy con "+ nombreChild +"!!" ;

        }
        else {
          require_services.push(servChild.getName());
          console.log("lista requires de ",servCheck, require_services);
          this.service_transitive_redundancy(servChild, require_services,servCheck);
          this.r_ds_transitive_redundancy(servChild);
        }
      }
    }
  }


  // -------------------- scope especific mandatory

  public analyse_mandatory_specific(datasheet:Datasheet){


    console.log("INIT SCOPE - Mandatory Specific");
    this.outResults = "";
    var StrcUnder = datasheet;
    var services = StrcUnder.getServices();

    for (let i = 0; i < services.length; i++) {
      this.gs_s_mandatorySpecific(services[i])
    }
    return this.outResults;
  }


  public gs_s_mandatorySpecific(serv:Service){

    let variantPoints = serv.getVariationPoints();
    let nombre = serv.getName();
    let scope = serv.getVariationScope();
    console.log("INIT GS DS ALTERNATIVE INCLUSION ",nombre);
    var mandatorySpecific= true;


   if (scope !="SpecificVariationPoint"){
     mandatorySpecific= false;
   }

    for (let i = 0; i < variantPoints.length; i++) {

      let vP_type = variantPoints[i].getVariabilityType();
      console.log(nombre, " CHECK ALTERNATIVE TyPE ", vP_type);

      if (vP_type !="MandatoryVP") {

        mandatorySpecific = false;

      }


      let vP = variantPoints[i].getVariants();
      for (let i = 0; i < vP.length; i++) {
        this.gs_s_mandatorySpecific(vP[i])
      }

    }

    if (mandatorySpecific){
      this.outResults =  this.outResults +"El VP  "+ nombre+" presenta un Mandatory specific"
    }


  }

}



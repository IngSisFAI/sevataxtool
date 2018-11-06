import { Component, OnInit } from '@angular/core';

import {Datasheet} from '../../clases/Datasheet';
import {Service} from '../../clases/Service';
import {Dependency} from '../../clases/Dependency';
import {VariantPoint} from '../../clases/VariantPoint';

@Component({
  selector: 'app-strategy-us',
  templateUrl: './strategy-us.component.html',
  styleUrls: ['./strategy-us.component.css']
})
export class StrategyUsComponent implements OnInit {

  private datasheetsJson:Datasheet[] = [];

  private listServices:Service[] = [];

  constructor() { }

  ngOnInit() {
  }


  public generarEstructura(entradaJson){

    let json = JSON.parse(entradaJson);

    console.log("Dentro de generarEstructura %%%%%%%");
    console.log("este es el Json", json);

    if(json.Datasheet){

      let ds = new Datasheet();
      ds.setName(json.Datasheet.id);
      this.datasheetsJson.push(ds); //Agregamos el nuevo datasheet al arreglo de la estructura



      if(json.Datasheet.service){
        //TODO: En este caso estoy tomando que un DS tiene solo 1 servicio! Hacer el generico!
        let service = this.crearServicio(json.Datasheet.service);
        ds.addService(service); //Agregamos el servicio a la lista del DS.


        //Si existe un servicio en ese Datasheet, lo  recorremos.
        this.traducirServicio(json.Datasheet.service);

      }

      console.log("########################## Traduccion Finalizada ################");
      console.log(ds);
      return ds;
    }


  }

  public traducirServicio(servicioJson){
    //Este metodo se encarga de recorrer un servicio en un Json y ejecutar las operaciones necesarias
    // para crear su estructura.
    console.log('Entre a recorrerServicio con .. ',servicioJson);


    if(servicioJson.GlobalVariationPoint != null){
      console.log('Punto variante globlal distinto de nulo');
      this.traducirPuntoGlobal(servicioJson.name,servicioJson.GlobalVariationPoint);
    }

    if(servicioJson.SpecificVariationPoint != null){
      console.log('Punto variante specifico distinto de nulo');
      this.traducirPuntoEspecifico(servicioJson.name, servicioJson.SpecificVariationPoint);
    }

    if(servicioJson.uses != null){
      console.log("########################## Traduccion USE ################", "dentro de ", servicioJson);
      console.log("########################## Traduccion USE ################", "dentro de ", servicioJson.uses);
      this.traducirUsa(servicioJson.name,servicioJson.uses);
    }

    if(servicioJson.require != null){
      console.log("########################## Traduccion REQUIRE ################", "dentro de ", servicioJson);
      this.traducirRequire(servicioJson.name,servicioJson.require);
    }

    if(servicioJson.exclude != null){
      console.log("########################## Traduccion Exclude ################", "dentro de ", servicioJson);
      this.traducirExclude(servicioJson.name,servicioJson.exclude);
    }

  }

  traducirPuntoEspecifico(propietario: string ,punto: any){

    // console.log(punto);
    let tipo = "nada";
    let variantPoint:VariantPoint = null;
    console.log('El propietario del punto global es...', propietario);

    for(var atr in punto){
      if(atr === 'AlternativeVP'){
        tipo = 'Alternativo';
        console.log('el tipo de punto variante es ' + tipo);
        variantPoint = this.traducirAlternativo(propietario,punto[atr].service);
        let sv = this.buscarServicio(propietario);
        sv.addVariationPoint(variantPoint); //Agregamos el punto variante generado al servicio duenio

      }

      if(atr === 'MandatoryVP'){
        tipo = 'Mandatorio';
        console.log('el tipo de punto variante es ' + tipo);
        variantPoint = this.traducirMandatory(propietario,punto[atr].service);
        let sv = this.buscarServicio(propietario);
        sv.addVariationPoint(variantPoint); //Agregamos el punto variante generado al servicio duenio

      }

      if(atr === 'OptionalVP'){
        tipo = 'Opcional';
        console.log('el tipo de punto variante es ' + tipo);
        console.log(punto[atr].service);
        console.log(this.listServices);
        variantPoint = this.traducirOpcional(propietario,punto[atr].service);
        let sv = this.buscarServicio(propietario);
        sv.addVariationPoint(variantPoint); //Agregamos el punto variante generado al servicio duenio


      }

      if(atr === 'VariantVP'){
        tipo = 'Variante';
        console.log('el tipo de punto variante es ' + tipo);
        variantPoint = this.traducirVariante(propietario,punto[atr].service);
        let sv = this.buscarServicio(propietario);
        sv.addVariationPoint(variantPoint); //Agregamos el punto variante generado al servicio duenio

      }


      //REVISAR SI LO SIGUIENTE VA NO O ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

      //Ahora para cada servicio encontrado, lo analizamos...
      console.log('comienza la descomposicion...');

      let servicios = punto[atr].service;
      console.log(servicios);
      for (let i = 0; i < servicios.length; i++) {
        this.traducirServicio(servicios[i]);
      }
    }







  }

  traducirPuntoGlobal(propietario: string ,punto: any){
    // console.log(punto);
    let tipo = "nada";
    let variantPoint:VariantPoint = null;
    console.log('El propietario del punto global es...', propietario);

    for(var atr in punto){
      if(atr === 'AlternativeVP'){
        tipo = 'Alternativo';
        console.log('el tipo de punto variante es ' + tipo);
        variantPoint = this.traducirAlternativo(propietario,punto[atr].service);
        let sv = this.buscarServicio(propietario);
        sv.addVariationPoint(variantPoint); //Agregamos el punto variante generado al servicio duenio

      }

      if(atr === 'MandatoryVP'){
        tipo = 'Mandatorio';
        console.log('el tipo de punto variante es ' + tipo);
        variantPoint = this.traducirMandatory(propietario,punto[atr].service);
        let sv = this.buscarServicio(propietario);
        sv.addVariationPoint(variantPoint); //Agregamos el punto variante generado al servicio duenio

      }

      if(atr === 'OptionalVP'){
        tipo = 'Opcional';
        console.log('el tipo de punto variante es ' + tipo);
        console.log(punto[atr].service);
        console.log(this.listServices);
        variantPoint = this.traducirOpcional(propietario,punto[atr].service);
        let sv = this.buscarServicio(propietario);
        sv.addVariationPoint(variantPoint); //Agregamos el punto variante generado al servicio duenio


      }

      if(atr === 'VariantVP'){
        tipo = 'Variante';
        console.log('el tipo de punto variante es ' + tipo);
        variantPoint = this.traducirVariante(propietario,punto[atr].service);
        let sv = this.buscarServicio(propietario);
        sv.addVariationPoint(variantPoint); //Agregamos el punto variante generado al servicio duenio

      }


      //REVISAR SI LO SIGUIENTE VA NO O ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

      //Ahora para cada servicio encontrado, lo analizamos...
      console.log('comienza la descomposicion...');

      let servicios = punto[atr].service;
      console.log(servicios);
      for (let i = 0; i < servicios.length; i++) {
        this.traducirServicio(servicios[i]);
      }
    }
  }

  private crearVarationPoint(type:string, servicesRel):VariantPoint{
    let variantPoint = new VariantPoint();
    variantPoint.setVariabilityType(type);

    //Agregamos los servicios relacionados.
    for (let i = 0; i < servicesRel.length; i++) {
        let service = this.crearServicio(servicesRel[i]);
        variantPoint.addVariantService(service);
    }
    console.log("variation Point -->",variantPoint);
    return variantPoint;

  }

  traducirMandatory(propietario: string ,serviciosRel: any){
    return this.crearVarationPoint('MandatoryVP',serviciosRel);
  }

  traducirOpcional(propietario: string ,serviciosRel: any){
    console.log("traduciendo opcionale ->",propietario );
    return this.crearVarationPoint('OptionalVP',serviciosRel);
  }

  traducirAlternativo(propietario: string ,serviciosRel: any){
    return this.crearVarationPoint('AlternativeVP',serviciosRel);
  }

  traducirVariante(propietario: string ,serviciosRel: any){
    return this.crearVarationPoint('VariantVP',serviciosRel);
  }



  private crearDependency(type:string, serviceRel):Dependency{
    let dependency:Dependency;
    dependency = new Dependency();
    dependency.setDependencyType(type);
    console.log("creando servicio con ",serviceRel);
    //let service = this.crearServicio(serviceRel.service);
    let service = this.crearServicio(serviceRel);
    dependency.setService(service);

    return dependency
  }

  private traducirDependency(propietario:string,type:string,serviciosRel){
    console.log("servicio ",propietario ,": analizando   --> ",type, "con", serviciosRel);
    console.log("aca entro el USA longitud", serviciosRel.service.length);
    /*if(serviciosRel.service.length == null){
      console.log("entro 1");
      //esto significa que es solo 1 servicio relacioando para este tipo.
      let dp = this.crearDependency(type,serviciosRel.service);
      let sv = this.buscarServicio(propietario);
      sv.addDependecy(dp);
    }
    else{*/

    console.log("entro al bucle ");
      //esto significa que es mas de 1 relacion del mismo tipo.
      for (let i = 0; i < serviciosRel.service.length; i++) {
        let dp = this.crearDependency(type,serviciosRel.service[i]);
        let sv = this.buscarServicio(propietario);
        sv.addDependecy(dp);
      }
    //}

    //Ahora para cada servicio encontrado, lo analizamos...
    console.log('DESCOMPONIENDO EL ',type, ' ------>');
    console.log( serviciosRel );
    for (let i = 0; i < serviciosRel.service.length; i++) {
      console.log( serviciosRel.service[i] );
      this.traducirServicio(serviciosRel.service[i]);
    }
  }

  traducirUsa(propietario: string ,serviciosRel: any){
    console.log("dale que va! ",serviciosRel);
    this.traducirDependency(propietario,'Use',serviciosRel);
  }

  traducirRequire(propietario: string ,serviciosRel: any){
    console.log("########################## REQUIRE 1 ################");
    this.traducirDependency(propietario,'Require',serviciosRel);
  }

  traducirExclude(propietario: string ,serviciosRel: any){
    this.traducirDependency(propietario,'Exclude',serviciosRel);
  }



  private buscarServicio(name:string):Service{

    let service = null;
    console.log("lista de servicios chequeando ", name, " --> ", this.listServices);
    for (let i = 0; i < this.listServices.length; i++) {
      // console.log('Estoy comparando .. ', this.listServices[i].getName() , '   con....  ',name )
        if(this.listServices[i].getName() === name){
          service = this.listServices[i];
        }
    }
    console.log("retorna ", service);

    return service;

  }
  private crearServicio(jsonService):Service{

    //Lo primero que hacemos, es asegurarnos si el objeto no existe.
    // let existencia = false;
    console.log("dentro del servicio con ----> ",jsonService);
    let service = this.buscarServicio(jsonService.name);

    if(service == null){
      //Si NO existe el servicio, lo creamos.
      //Creamos el objeto servicio y lo agregamos a la lista del DS.
      console.log("crea el servicio ");
      service = new Service();
      service.setName(jsonService.name);

      //Definimos las propiedades del servicio.
      if(jsonService.GlobalVariationPoint){
        service.setVariationScope('GlobalVariationPoint');
      }
      else{
        if(jsonService.SpecificVariationPoint){
          service.setVariationScope('SpecificVariationPoint');
        }
      }

      //Agregamos el servicio a la lista.
      this.listServices.push(service);
    }
    console.log("retorna 2 --> ", service);
    return service;
  }

}

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
    console.log(json);

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
      this.traducirPuntoEspecifico(servicioJson.name, servicioJson.SpecificVariationPoint);
    }

    if(servicioJson.uses != null){
      this.traducirUsa(servicioJson.name,servicioJson.uses);
    }

    if(servicioJson.require != null){
      this.traducirRequire(servicioJson.name,servicioJson.require);
    }

    if(servicioJson.exclude != null){
      this.traducirExclude(servicioJson.name,servicioJson.exclude);
    }

  }

  traducirPuntoEspecifico(propietario: string ,punto: any){
    //Por determinar
    //TODO: Hacer esto por el amor de cristo.!
  }

  traducirPuntoGlobal(propietario: string ,punto: any){
    // console.log(punto);
    let tipo = "nada";
    let variantPoint:VariantPoint = null;
    console.log('El propietario del punto global es...', propietario)
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

    return variantPoint;
  }

  traducirMandatory(propietario: string ,serviciosRel: any){
    return this.crearVarationPoint('MandatoryVP',serviciosRel);
  }

  traducirOpcional(propietario: string ,serviciosRel: any){
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
    let service = this.crearServicio(serviceRel.service);
    dependency.setService(service)


    return dependency;
  }

  private traducirDependency(propietario:string,type:string,serviciosRel){
    if(serviciosRel.length == null){
      //esto significa que es solo 1 servicio relacioando para este tipo.
      let dp = this.crearDependency(type,serviciosRel);
      let sv = this.buscarServicio(propietario);
      sv.addDependecy(dp);
    }
    else{
      //esto significa que es mas de 1 relacion del mismo tipo.
      for (let i = 0; i < serviciosRel.length; i++) {
        let dp = this.crearDependency(type,serviciosRel[i]);
        let sv = this.buscarServicio(propietario);
        sv.addDependecy(dp);
      }
    }

    //Ahora para cada servicio encontrado, lo analizamos...
    console.log('DESCOMPONIENDO EL ',type, ' ------>');
    for (let i = 0; i < serviciosRel.length; i++) {
      this.traducirServicio(serviciosRel[i].service);
    }
  }

  traducirUsa(propietario: string ,serviciosRel: any){
    this.traducirDependency(propietario,'Use',serviciosRel);
  }

  traducirRequire(propietario: string ,serviciosRel: any){
    this.traducirDependency(propietario,'Require',serviciosRel);
  }

  traducirExclude(propietario: string ,serviciosRel: any){
    this.traducirDependency(propietario,'Exclude',serviciosRel);
  }



  private buscarServicio(name:string):Service{

    let service = null;
    for (let i = 0; i < this.listServices.length; i++) {
      // console.log('Estoy comparando .. ', this.listServices[i].getName() , '   con....  ',name )
        if(this.listServices[i].getName() === name){
          service = this.listServices[i];
        }
    }

    return service;

  }
  private crearServicio(jsonService):Service{

    //Lo primero que hacemos, es asegurarnos si el objeto no existe.
    // let existencia = false;
    let service = this.buscarServicio(jsonService.name);

    if(service == null){
      //Si NO existe el servicio, lo creamos.
      //Creamos el objeto servicio y lo agregamos a la lista del DS.
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
    return service;
  }

}

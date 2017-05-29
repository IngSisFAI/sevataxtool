import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  servicios = [];
  cantServ = 0;
  salida: string = "";
  stringTemp: string = "";

  constructor() {
    this.salida = "nada";
  }

  ngOnInit() {
  }

  traducirJson(json){
    console.log(json);
    this.salida = json;
    this.servicios = [];
    this.cantServ = 1;


    let a = JSON.parse(json);

    console.log(a);
    //Agrego el servicio obligatorio del DS a la lista de servicios y ya me queda con el numero 0
    this.servicios.push([this.cantServ,a.Datasheet.id]);
    this.stringTemp = this.cantServ + ' 0 \n';
    this.cantServ++;


    //Debo recorrer todo el json en busca de todos los servicios y puntos variantes.
    let ds = a.Datasheet;

    //Agrego el servicio raiz del DS al arreglo.
    this.traducirServicio(ds.service);

    /*for(var atr in ds){
      console.log(atr);
      var nombreAtr = ds[atr];
      console.log(nombreAtr);
    }*/


  }

  agregarServicio(nombre:string){
    if(this.servicios.find(x=> x[1] === nombre)){
      //Si ya lo tengo agregado al servicio
      console.log('ya existia ese servicio');
    }
    else{
      //Si no existia ese servicio
      console.log('No existia el servicio');
      this.servicios.push([this.cantServ,nombre]);
      this.cantServ++;
    }
  }

  traducirServicio(servicio: any){

    this.agregarServicio(servicio.name);

    if(servicio.GlobalVariationPoint != null){
      console.log('Punto variante globlal distinto de nulo');
      this.traducirPuntoGlobal(servicio.name,servicio.GlobalVariationPoint);
    }

    if(servicio.SpecificVariationPoint != null){
      this.traducirPuntoEspecifico(servicio.name, servicio.SpecificVariationPoint);
    }

    console.log('el string esta de la siguiente manera..');
    console.log(this.stringTemp);
  }

  traducirPuntoEspecifico(propietario: string ,punto: any){
    //Por determinar
  }

  traducirPuntoGlobal(propietario: string ,punto: any){
    console.log(punto);
    let tipo = "nada";
    for(var atr in punto){
      if(atr === 'AlternativeVP'){
        tipo = 'Alternativo';
        this.traducirAlternativo(propietario,punto[atr]);
      }

      if(atr === 'MandatoryVP'){
        tipo = 'Mandatorio';
        this.traducirMandatory(propietario,punto[atr]);
      }

      if(atr === 'OptionalVP'){
        tipo = 'Opcional';
        console.log(punto[atr].service);
        this.traducirOpcional(propietario,punto[atr].service);

      }

      if(atr === 'VariantVP'){
        tipo = 'Variante';
        this.traducirVariante(propietario,punto[atr]);
      }
      console.log('el tipo de punto variante es ' + tipo);

      //REVISAR SI LO SIGUIENTE VA NO O ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

      //Ahora para cada servicio encontrado, lo analizamos...
      console.log('comienza la descomposicion...');
      let servicios = punto[atr].service;
      console.log(servicios);
      for (let i = 0; i < servicios.length; i++) {
        console.log('llalalalalal' + servicios[i]);
        this.traducirServicio(servicios[i]);
      }
    }
  }


  traducirMandatory(propietario: string ,serviciosRel: any){
  }

  traducirOpcional(propietario: string ,serviciosRel: any){
    let numP = this.devolverNumeroServicio(propietario);
    for (let i = 0; i < serviciosRel.length; i++) {
        this.agregarServicio(serviciosRel[i].name);
        let numS = this.devolverNumeroServicio(serviciosRel[i].name);
        console.log('el numero del servicio ' + serviciosRel[i].name + '  es:  '+  numS);
        let regla = numP + ' -' + numS + ' ' + numS + ' 0 \n';
        this.agregarRegla(regla);
    }

  }

  traducirAlternativo(propietario: string ,serviciosRel: any){

  }

  traducirVariante(propietario: string ,serviciosRel: any){

  }

  traducirUsa(serviciosUsados: any){

  }


  confeccionarStringFinal(){
    //Este metodo va a ser el encargado de armar el string final de CNF.
    //Debera armar la cabecera del archivo y unir las reglas ya creadas.
  }


  devolverNumeroServicio(nombre:string){
    //Metodo que busca en el arreglo de servicios, el servicio con name=nombre, y devuelve el numero asignado.
    let resultado = -1;
    let serv = this.servicios.find(x=> x[1] === nombre); //Busco el servicio en el arreglo para conocer su numero
    if(serv != null){
      resultado = serv[0];
    }
    return resultado;
  }

  agregarRegla(regla: string){
    this.stringTemp = this.stringTemp +  regla;
  }

}

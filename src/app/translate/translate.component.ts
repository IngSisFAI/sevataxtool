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
  cantidadReglas = 0;

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

    console.log(this.servicios);
    this.confeccionarStringFinal();
  }

  agregarServicio(nombre:string){
    if(this.servicios.find(x=> x[1] === nombre)){
      //Si ya lo tengo agregado al servicio
      console.log('ya existia ese servicio: ' + nombre);
    }
    else{
      //Si no existia ese servicio
      console.log('No existia el servicio: '+ nombre);
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

    if(servicio.uses != null){
      this.traducirUsa(servicio.name,servicio.uses);
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
        console.log('el tipo de punto variante es ' + tipo);
        this.traducirAlternativo(propietario,punto[atr].service);
      }

      if(atr === 'MandatoryVP'){
        tipo = 'Mandatorio';
        console.log('el tipo de punto variante es ' + tipo);
        this.traducirMandatory(propietario,punto[atr].service);
      }

      if(atr === 'OptionalVP'){
        tipo = 'Opcional';
        console.log('el tipo de punto variante es ' + tipo);
        console.log(punto[atr].service);
        this.traducirOpcional(propietario,punto[atr].service);

      }

      if(atr === 'VariantVP'){
        tipo = 'Variante';
        console.log('el tipo de punto variante es ' + tipo);
        this.traducirVariante(propietario,punto[atr].service);
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


  traducirMandatory(propietario: string ,serviciosRel: any){
    console.log('ENTRE A TRADUCIR MANDATORY........ para el servicio: ' + propietario);
    let numP = this.devolverNumeroServicio(propietario);
    console.log(serviciosRel);
    for (let i = 0; i < serviciosRel.length; i++) {
      this.agregarServicio(serviciosRel[i].name);
      let numS = this.devolverNumeroServicio(serviciosRel[i].name);
      console.log('el numero del servicio ' + serviciosRel[i].name + '  es:  '+  numS);
      let regla = '-'+numP + ' ' + numS + ' 0 \n';
      console.log('REGLA DEL MANDATORY = :  ' + regla);
      this.agregarRegla(regla);
    }
  }

  traducirOpcional(propietario: string ,serviciosRel: any){
    console.log('ENTRE A TRADUCIR OPCIONAL....... para el servicio: ' + propietario);
    console.log('Mis ServRel son: '+ serviciosRel.service);
    let numP = this.devolverNumeroServicio(propietario);
    for (let i = 0; i < serviciosRel.length; i++) {
        this.agregarServicio(serviciosRel[i].name);
        let numS = this.devolverNumeroServicio(serviciosRel[i].name);
        console.log('el numero del servicio ' + serviciosRel[i].name + '  es:  '+  numS);
        let regla = '-'+numP + ' -' + numS + ' ' + numS + ' 0 \n';
        console.log('REGLA DEL OPCIONAL = :  ' + regla);
        this.agregarRegla(regla);
    }

  }

  traducirAlternativo(propietario: string ,serviciosRel: any){
    console.log('ENTRE A TRADUCIR ALTERNATIVO....... para el servicio: ' + propietario);
    console.log('Mis ServRel son: '+ serviciosRel);
    let serviciosHijos = [];
    let numP = this.devolverNumeroServicio(propietario);
    for (let i = 0; i < serviciosRel.length; i++) {
      console.log('La longitud de hijos es de: ' + serviciosRel.length);
      this.agregarServicio(serviciosRel[i].name);
      let numS = this.devolverNumeroServicio(serviciosRel[i].name);
      console.log('el numero del servicio ' + serviciosRel[i].name + '  es:  '+  numS);
      serviciosHijos.push(numS);
    }
    console.log('Alternativo, Soy: '+ propietario + '  con mi numero: ' + numP);
    console.log("Y mis servicios hijos son: " + serviciosHijos);

    let regla = '';
    regla = '-' + numP;
    for (let i = 0; i < serviciosHijos.length; i++) {
        regla = regla + ' ' + serviciosHijos[i];
    }
    regla = regla + ' 0 \n';
    console.log('1º Regla alternativa: ' + regla);
    this.agregarRegla(regla);

    //Reinicio la variable Regla temporal.
    regla = '';
    //A continuacion agregaremos las reglas de solo 1 positvo.
    for (let i = 0; i < serviciosHijos.length; i++) {
      regla = '-' + numP;
      for (let j = 0; j < serviciosHijos.length; j++) {
          if(i == j){
            //Entonces este sera el elemento positivo (solo se va a dar 1 vez en todas las vueltas para cada servicio)
            regla = regla + ' ' + serviciosHijos[j];
          }
          else{
            regla = regla + ' -' + serviciosHijos[j];
          }
      }
      regla = regla + ' 0 \n';
      console.log(i+'º Regla alternativa: ' + regla);
      this.agregarRegla(regla);
    }

    //Ahora debemos agregar las combinaciones de los hijos.
    /** REVISAR CUANDO LA CANTIDAD DE HIJOS ES 2 O MAS DE 3!!! HARDCODEADO PARA 3 SOLAMENTE */
    regla = '';
    for (let i = 0; i < serviciosHijos.length; i++) {
      if(i==(serviciosHijos.length-1)){
        regla = '-'+serviciosHijos[i] + ' -'+serviciosHijos[0] + ' 0 \n';
        console.log('Regla giratoria del alternativo...');
      }
      else{
        regla = '-'+serviciosHijos[i] + ' -'+serviciosHijos[i+1] + ' 0 \n';
      }

      console.log('Regla combinatoria... : ' + regla);
      this.agregarRegla(regla);
      regla = ''; //Limpio la regla por las dudas...
    }

  }

  traducirVariante(propietario: string ,serviciosRel: any){
    console.log('ENTRE A TRADUCIR VARIANTE....... para el servicio: ' + propietario);
    console.log('Mis ServRel son: '+ serviciosRel);

  }

  traducirUsa(propietario: string ,serviciosUsados: any){
    console.log('ENTRE AL USA PARA EL SERVICIO: ' + propietario);
    console.log('Los servicios usados son: ' + serviciosUsados.service);
    console.log(serviciosUsados);

    let numP = this.devolverNumeroServicio(propietario);
    if(serviciosUsados.length == null){
      //ESTO SIGNIFICA QUE ES SOLO 1 EL SERVICIO USADO.
      console.log(serviciosUsados.service);
      this.agregarServicio(serviciosUsados.service.name);
      let numS = this.devolverNumeroServicio(serviciosUsados.service.name);
      let regla = '-'+ numP + ' ' + numS + ' 0 \n';
      this.agregarRegla(regla);
      regla = '-'+ numS + ' ' + numP + ' 0 \n';
      this.agregarRegla(regla);

      this.traducirServicio(serviciosUsados.service);

    }
    else{
      //ESTO SIGNIFICA QUE EXISTEN MAS DE 1 SERVICIO USADO.

      console.log('Longitud de servicios de USA de: ' + propietario + ' es igual a : ' + serviciosUsados.length);
      for (let i = 0; i < serviciosUsados.length; i++) {
          serviciosUsados[i].service;
          this.agregarServicio(serviciosUsados[i].service.name);
          let numS = this.devolverNumeroServicio(serviciosUsados[i].service.name);

          let regla = '-'+ numP + ' ' + numS + ' 0 \n';
          this.agregarRegla(regla);
          regla = '-'+ numS + ' ' + numP + ' 0 \n';
          this.agregarRegla(regla);
      }

      //Ahora para cada servicio encontrado, lo analizamos...
      console.log('DESCOMPONIENDO EL USA------>');
      for (let i = 0; i < serviciosUsados.length; i++) {
        this.traducirServicio(serviciosUsados[i].service);
      }
    }
  }


  confeccionarStringFinal(){
    //Este metodo va a ser el encargado de armar el string final de CNF.
    //Debera armar la cabecera del archivo y unir las reglas ya creadas.

    let temp = 'p cnf ' + this.servicios.length + ' ' + this.cantidadReglas + '\n';
    console.log(temp);
    this.salida = temp + this.stringTemp;
    console.log(this.salida);
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
    this.cantidadReglas ++ ;
  }

}

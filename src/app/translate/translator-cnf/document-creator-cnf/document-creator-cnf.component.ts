import { Component } from '@angular/core';
import { LogicRulesCNFComponent } from '../logic-rules-cnf/logic-rules-cnf.component';
import { SolverConfigurationComponent } from '../../solver-configuration-cnf/solver-configuration-sat.component';
@Component({
  selector: 'document-creator-cnf'
})
export class DocumentCreatorCNFComponent {
  servicios = [];
  cantServ = 0;
  salida = '';
  stringRaices = '';
  stringTemp = '';
  cantidadReglas = 0;

  constructor(
    private logicRules: LogicRulesCNFComponent,
    private solverConfiguration: SolverConfigurationComponent
  ) {}

  /**
   * *Este metodo se encarga de recibir un JSON en el cual esta especificada la estructura de los servicios (DataSheet)
   * *y devuelve en CNF el analisis.
   * @param json Estructura de la dependencia de los servicios
   */
  traducirJson(json) {
    console.log('El json inicial es: ');
    console.log(json);
    this.salida = json;
    this.servicios = [];
    this.cantServ = 1;
    this.cantidadReglas = 0;
    this.stringRaices = '';
    this.stringTemp = '';

    const a = JSON.parse(json);

    // Agrego el servicio obligatorio del DS a la lista de servicios y ya me queda con el numero 0
    this.servicios.push([this.cantServ, a.Datasheet.id]);
    this.stringRaices = this.cantServ + ' 0 \n';
    this.cantServ++;

    const ds = a.Datasheet;
    let numeroServicio;
    if (ds.service.length == null) {
      // Esto significa que hay un solo servicio raiz para este DS.
      // Agrego el servicio raiz del DS al arreglo.
      this.traducirServicio(ds.service);
      numeroServicio = this.devolverNumeroServicio(ds.service.name);
      this.stringRaices = this.stringRaices + '-1 ' + numeroServicio + ' 0 \n';
    } else {
      // Hay mas de 1 raiz para este DS.
      for (let i = 0; i < ds.service.length; i++) {
        this.traducirServicio(ds.service[i]);
        numeroServicio = this.devolverNumeroServicio(ds.service[i].name);
        this.stringRaices =
          this.stringRaices + '-1 ' + numeroServicio + ' 0 \n';
      }
    }
    /*for(var atr in ds){
      console.log(atr);
      var nombreAtr = ds[atr];
      console.log(nombreAtr);
    }*/

    console.log(this.servicios);
    this.confeccionarStringFinal();
  }

  agregarServicio(nombre: string) {
    if (this.servicios.find(x => x[1] === nombre)) {
      // Si ya lo tengo agregado al servicio
      console.log('ya existia ese servicio: ' + nombre);
    } else {
      // Si no existia ese servicio
      console.log('No existia el servicio: ' + nombre);
      this.servicios.push([this.cantServ, nombre]);
      this.cantServ++;
    }
  }

  traducirServicio(servicio: any) {
    this.agregarServicio(servicio.name);

    if (servicio.GlobalVariationPoint != null) {
      console.log('Punto variante globlal distinto de nulo');
      this.traducirPuntoGlobal(servicio.name, servicio.GlobalVariationPoint);
    }

    if (servicio.SpecificVariationPoint != null) {
      this.traducirPuntoEspecifico(
        servicio.name,
        servicio.SpecificVariationPoint
      );
    }

    if (servicio.uses != null) {
      this.logicRules.traducirUsa(servicio.name, servicio.uses);
    }

    if (servicio.require != null) {
      this.logicRules.traducirRequire(servicio.name, servicio.require);
    }

    if (servicio.exclude != null) {
      this.logicRules.traducirExclude(servicio.name, servicio.exclude);
    }
    /**
    console.log('el string esta de la siguiente manera..');
    console.log(this.stringTemp);

    */
  }

  traducirPuntoEspecifico(propietario: string, punto: any) {
    // Por determinar
  }

  traducirPuntoGlobal(propietario: string, punto: any) {
    console.log(punto);
    let tipo = 'nada';
    for (const atr of Object.keys(punto)) {
      if (atr === 'AlternativeVP') {
        tipo = 'Alternativo';
        console.log('el tipo de punto variante es ' + tipo);
        this.logicRules.traducirAlternativo(propietario, punto[atr].service);
      }

      if (atr === 'MandatoryVP') {
        tipo = 'Mandatorio';
        console.log('el tipo de punto variante es ' + tipo);
        this.logicRules.traducirMandatory(propietario, punto[atr].service);
      }

      if (atr === 'OptionalVP') {
        tipo = 'Opcional';
        console.log('el tipo de punto variante es ' + tipo);
        console.log(punto[atr].service);
        this.logicRules.traducirOpcional(propietario, punto[atr].service);
      }

      if (atr === 'VariantVP') {
        tipo = 'Variante';
        console.log('el tipo de punto variante es ' + tipo);
        this.logicRules.traducirVariante(propietario, punto[atr].service);
      }

      // REVISAR SI LO SIGUIENTE VA NO O ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

      // Ahora para cada servicio encontrado, lo analizamos...
      console.log('comienza la descomposicion...');
      const servicios = punto[atr].service;
      console.log(servicios);
      for (let i = 0; i < servicios.length; i++) {
        this.traducirServicio(servicios[i]);
      }
    }
  }

  confeccionarStringFinal() {
    // Este metodo va a ser el encargado de armar el string final de CNF.
    // Debera armar la cabecera del archivo y unir las reglas ya creadas.

    // let temp = 'p cnf ' + this.servicios.length + ' ' + this.cantidadReglas + '\n';
    // let cabecera = this.solverConfiguration.confeccionarCabecera(this.servicios.length);
    // console.log(temp);
    // this.salida = temp +  this.stringRaices + this.stringTemp;

    this.salida = this.solverConfiguration.finalizarCreacionDocumento(
      this.servicios.length,
      this.stringRaices
    );
    return this.salida;
  }

  public obtenerSalida() {
    return this.salida;
  }

  // public obtenerCabecera(){
  //
  // }

  public devolverNumeroServicio(nombre: string) {
    // Metodo que busca en el arreglo de servicios, el servicio con name=nombre, y devuelve el numero asignado.
    let resultado = -1;
    const serv = this.servicios.find(x => x[1] === nombre); // Busco el servicio en el arreglo para conocer su numero
    if (serv != null) {
      resultado = serv[0];
    }
    return resultado;
  }

  agregarRegla(regla: string) {
    this.solverConfiguration.agregarRegla(regla); // Transferimos la responsabilidad al solverConfiguration.
  }
}

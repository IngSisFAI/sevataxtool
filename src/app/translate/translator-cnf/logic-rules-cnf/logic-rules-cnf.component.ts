import { Component } from '@angular/core';
import { DocumentCreatorCNFComponent } from '../document-creator-cnf/document-creator-cnf.component';


@Component({
  selector: 'logic-rules-cnf'
})

export class LogicRulesCNFComponent {
  servicios = [];
  cantServ = 0;
  salida = '';
  stringRaices = '';
  stringTemp = '';
  cantidadReglas = 0;

  constructor(private documentCreator: DocumentCreatorCNFComponent ){}


  traducirMandatory(propietario: string, serviciosRel: any) {
    console.log(
      'ENTRE A TRADUCIR MANDATORY........ para el servicio: ' + propietario
    );
    const numP = this.documentCreator.devolverNumeroServicio(propietario);
    console.log(serviciosRel);
    for (let i = 0; i < serviciosRel.length; i++) {
      this.documentCreator.agregarServicio(serviciosRel[i].name);
      const numS = this.documentCreator.devolverNumeroServicio(serviciosRel[i].name);
      console.log(
        'el numero del servicio ' + serviciosRel[i].name + '  es:  ' + numS
      );
      const regla = '-' + numP + ' ' + numS + ' 0 \n';
      console.log('REGLA DEL MANDATORY = :  ' + regla);
      this.documentCreator.agregarRegla(regla);
    }
  }

  traducirOpcional(propietario: string, serviciosRel: any) {
    console.log(
      'ENTRE A TRADUCIR OPCIONAL....... para el servicio: ' + propietario
    );
    console.log('Mis ServRel son: ' + serviciosRel);
    const numP = this.documentCreator.devolverNumeroServicio(propietario);
    for (let i = 0; i < serviciosRel.length; i++) {
      this.documentCreator.agregarServicio(serviciosRel[i].name);
      const numS = this.documentCreator.devolverNumeroServicio(serviciosRel[i].name);
      console.log(
        'el numero del servicio ' + serviciosRel[i].name + '  es:  ' + numS
      );
      const regla = '-' + numP + ' -' + numS + ' ' + numS + ' 0 \n';
      console.log('REGLA DEL OPCIONAL = :  ' + regla);
      this.documentCreator.agregarRegla(regla);
    }
  }

  traducirAlternativo(propietario: string, serviciosRel: any) {
    console.log(
      'ENTRE A TRADUCIR ALTERNATIVO....... para el servicio: ' + propietario
    );
    console.log('Mis ServRel son: ' + serviciosRel);
    const serviciosHijos = [];
    const numP = this.documentCreator.devolverNumeroServicio(propietario);

    // Agrego todos los servicios hijos del punto variante alternativo al arreglo de servicios conocidos.
    for (let i = 0; i < serviciosRel.length; i++) {
      console.log('La longitud de hijos es de: ' + serviciosRel.length);
      this.documentCreator.agregarServicio(serviciosRel[i].name);
      const numS = this.documentCreator.devolverNumeroServicio(serviciosRel[i].name);
      console.log(
        'el numero del servicio ' + serviciosRel[i].name + '  es:  ' + numS
      );
      serviciosHijos.push(numS);
    }

    console.log(
      'Alternativo, Soy: ' + propietario + '  con mi numero: ' + numP
    );
    console.log('Y mis servicios hijos son: ' + serviciosHijos);

    // Aca armo la regla de todos los hijos positivos.
    // Ejemplo -1 2 3 4 0 , donde 1 es el servicio con el punto variante alternativo.
    console.log('DALE PAPA1º Regla alternativa: ');

    let regla = '';
    regla = '-' + numP;
    for (let i = 0; i < serviciosHijos.length; i++) {
      regla = regla + ' ' + serviciosHijos[i];
    }
    regla = regla + ' 0 \n';
    console.log('1º Regla alternativa: ' + regla);
    // -padre -> hijos (positivos )
    // -2 3 4 0

    this.documentCreator.agregarRegla(regla);

    // Reinicio la variable Regla temporal.

    regla = '-' + numP;
    // A continuacion agregaremos las reglas de solo 1 positvo.
    if (serviciosHijos.length === 2) {
      for (let i = 0; i < serviciosHijos.length; i++) {
        regla = regla + ' -' + serviciosHijos[i];
      }
      regla = regla + ' 0 \n';
      console.log('1º Regla alternativa: ' + regla);
      // -padre -> hijos (negativos )
      // -2 -3 -4 0
      this.documentCreator.agregarRegla(regla);
    }

    if (serviciosHijos.length > 2) {
      for (let i = 0; i < serviciosHijos.length; i++) {
        regla = '-' + numP;
        for (let j = 0; j < serviciosHijos.length; j++) {
          if (i === j) {
            // Entonces este sera el elemento positivo (solo se va a dar 1 vez en todas las vueltas para cada servicio)
            regla = regla + ' ' + serviciosHijos[j];
          } else {
            regla = regla + ' -' + serviciosHijos[j];
          }
        }
        regla = regla + ' 0 \n';
        console.log(i + 'º Regla alternativa: ' + regla);
        this.documentCreator.agregarRegla(regla);
      }
    }

    // Ahora debemos agregar las combinaciones de los hijos.
    /** REVISAR CUANDO LA CANTIDAD DE HIJOS ES 2 O MAS DE 3!!! HARDCODEADO PARA 3 SOLAMENTE */
    regla = '';
    if (serviciosHijos.length > 2) {
      for (let i = 0; i < serviciosHijos.length; i++) {
        if (i === serviciosHijos.length - 1 && serviciosHijos.length !== 2) {
          regla = '-' + serviciosHijos[i] + ' -' + serviciosHijos[0] + ' 0 \n';
          console.log('Regla giratoria del alternativo...');
        } else {
          regla =
            '-' + serviciosHijos[i] + ' -' + serviciosHijos[i + 1] + ' 0 \n';
        }

        console.log('Regla combinatoria... : ' + regla);
        console.log('Regla XXXXXXXXXXXX... : ' + regla);
        this.documentCreator.agregarRegla(regla);
        regla = ''; // Limpio la regla por las dudas...
      }
    }
  }

  traducirVariante(propietario: string, serviciosRel: any) {
    console.log(
      'ENTRE A TRADUCIR VARIANTE....... para el servicio: ' + propietario
    );
    console.log('Mis ServRel son: ' + serviciosRel);
  }

  traducirUsa(propietario: string, serviciosUsados: any) {
    console.log('ENTRE AL USA PARA EL SERVICIO: ' + propietario);
    console.log('Los servicios usados son: ' + serviciosUsados.service);
    console.log(serviciosUsados);

    const numP = this.documentCreator.devolverNumeroServicio(propietario);
    if (serviciosUsados.length == null) {
      // ESTO SIGNIFICA QUE ES SOLO 1 EL SERVICIO USADO.
      console.log(serviciosUsados.service);
      this.documentCreator.agregarServicio(serviciosUsados.service.name);
      const numS = this.documentCreator.devolverNumeroServicio(serviciosUsados.service.name);
      let regla = '-' + numP + ' ' + numS + ' 0 \n';
      this.documentCreator.agregarRegla(regla);
      regla = '-' + numS + ' ' + numP + ' 0 \n';
      this.documentCreator.agregarRegla(regla);

      this.documentCreator.traducirServicio(serviciosUsados.service);
    } else {
      // ESTO SIGNIFICA QUE EXISTEN MAS DE 1 SERVICIO USADO.

      console.log(
        'Longitud de servicios de USA de: ' +
          propietario +
          ' es igual a : ' +
          serviciosUsados.length
      );
      for (let i = 0; i < serviciosUsados.length; i++) {
        this.documentCreator.agregarServicio(serviciosUsados[i].service.name);
        const numS = this.documentCreator.devolverNumeroServicio(serviciosUsados[i].service.name);

        let regla = '-' + numP + ' ' + numS + ' 0 \n';
        this.documentCreator.agregarRegla(regla);
        regla = '-' + numS + ' ' + numP + ' 0 \n';
        this.documentCreator.agregarRegla(regla);
      }

      // Ahora para cada servicio encontrado, lo analizamos...
      console.log('DESCOMPONIENDO EL USA------>');
      for (let i = 0; i < serviciosUsados.length; i++) {
        this.documentCreator.traducirServicio(serviciosUsados[i].service);
      }
    }
  }

  traducirRequire(propietario: string, serviciosUsados: any) {
    const numP = this.documentCreator.devolverNumeroServicio(propietario);
    if (serviciosUsados.length == null) {
      // Hay 1 require.
      this.documentCreator.agregarServicio(serviciosUsados.service.name);
      const numS = this.documentCreator.devolverNumeroServicio(serviciosUsados.service.name);
      const regla = '-' + numP + ' ' + numS + ' 0 \n';
      this.documentCreator.agregarRegla(regla);
      this.documentCreator.traducirServicio(serviciosUsados.service); // Traduzco el servicio requerido por si tiene mas cosas.
    } else {
      // Hay mas de 1 require.
      for (let i = 0; i < serviciosUsados.length; i++) {
        this.documentCreator.agregarServicio(serviciosUsados[i].service.name);
        const numS = this.documentCreator.devolverNumeroServicio(serviciosUsados[i].service.name);

        const regla = '-' + numP + ' ' + numS + ' 0 \n';
        this.documentCreator.agregarRegla(regla);
      }
      // Ahora para cada servicio encontrado, lo analizamos...
      for (let i = 0; i < serviciosUsados.length; i++) {
        this.documentCreator.traducirServicio(serviciosUsados[i].service);
      }
    }
  }

  traducirExclude(propietario: string, serviciosUsados: any) {
    const numP = this.documentCreator.devolverNumeroServicio(propietario);
    if (serviciosUsados.length == null) {
      // Hay 1 exclude.
      this.documentCreator.agregarServicio(serviciosUsados.service.name);
      const numS = this.documentCreator.devolverNumeroServicio(serviciosUsados.service.name);
      const regla = '-' + numP + ' -' + numS + ' 0 \n';
      this.documentCreator.agregarRegla(regla);
      this.documentCreator.traducirServicio(serviciosUsados.service); // Traduzco el servicio excluido por si tiene mas cosas.
    } else {
      // Hay mas de 1 exclude.
      for (let i = 0; i < serviciosUsados.length; i++) {
        this.documentCreator.agregarServicio(serviciosUsados[i].service.name);
        const numS = this.documentCreator.devolverNumeroServicio(serviciosUsados[i].service.name);

        const regla = '-' + numP + ' -' + numS + ' 0 \n';
        this.documentCreator.agregarRegla(regla);
      }
      // Ahora para cada servicio encontrado, lo analizamos...
      for (let i = 0; i < serviciosUsados.length; i++) {
        this.documentCreator.traducirServicio(serviciosUsados[i].service);
      }
    }
  }


}

import { Component } from '@angular/core';

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

  constructor() {}

  traducirMandatory(numP: number, serviciosHijos: any): string {
    // const numP = this.documentCreator.devolverNumeroServicio(propietario);
    console.log(serviciosHijos);
    let regla = '';
    for (let i = 0; i < serviciosHijos.length; i++) {
      regla += '-' + numP + ' ' + serviciosHijos[i] + ' 0 \n';
      console.log('REGLA DEL MANDATORY = :  ' + regla);
      // this.documentCreator.agregarRegla(regla);
    }
    return regla;
  }

  traducirOpcional(numP: number, serviciosHijos: any): string {
    let regla = '';
    for (let i = 0; i < serviciosHijos.length; i++) {
      regla +=
        '-' +
        numP +
        ' -' +
        serviciosHijos[i] +
        ' ' +
        serviciosHijos[i] +
        ' 0 \n';
      console.log('REGLA DEL OPCIONAL = :  ' + regla);
    }
    return regla;
  }

  traducirAlternativo(numP: number, serviciosHijos: any): string {
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

    // Reinicio la variable Regla temporal.

    
    // A continuacion agregaremos las reglas de solo 1 positvo.
    if (serviciosHijos.length === 2) {
      regla += "-" + numP;
      for (let i = 0; i < serviciosHijos.length; i++) {
        regla += ' -' + serviciosHijos[i];
      }
      regla += ' 0 \n';
      console.log('1º Regla alternativa: ' + regla);
      // -padre -> hijos (negativos )
      // -2 -3 -4 0
      // this.documentCreator.agregarRegla(regla);
    }

    if (serviciosHijos.length > 2) {
      for (let i = 0; i < serviciosHijos.length; i++) {
        regla += '-' + numP;
        for (let j = 0; j < serviciosHijos.length; j++) {
          if (i === j) {
            // Entonces este sera el elemento positivo (solo se va a dar 1 vez en todas las vueltas para cada servicio)
            regla += ' ' + serviciosHijos[j];
          } else {
            regla += ' -' + serviciosHijos[j];
          }
        }
        regla += ' 0 \n';
        console.log(i + 'º Regla alternativa: ' + regla);
        // this.documentCreator.agregarRegla(regla);
      }
    }

    // Ahora debemos agregar las combinaciones de los hijos.
    /** REVISAR CUANDO LA CANTIDAD DE HIJOS ES 2 O MAS DE 3!!! HARDCODEADO PARA 3 SOLAMENTE */
    // regla = '';
    if (serviciosHijos.length > 2) {
      for (let i = 0; i < serviciosHijos.length; i++) {
        if (i === serviciosHijos.length - 1 && serviciosHijos.length !== 2) {
          regla += '-' + serviciosHijos[i] + ' -' + serviciosHijos[0] + ' 0 \n';
          console.log('Regla giratoria del alternativo...');
        } else {
          regla +=
            '-' + serviciosHijos[i] + ' -' + serviciosHijos[i + 1] + ' 0 \n';
        }

        console.log('Regla combinatoria... : ' + regla);
        console.log('Regla XXXXXXXXXXXX... : ' + regla);
        // this.documentCreator.agregarRegla(regla);
        // regla = ''; // Limpio la regla por las dudas...
      }
    }

    return regla;
  }

  traducirVariante(propietario: string, serviciosRel: any) {
    console.log(
      'ENTRE A TRADUCIR VARIANTE....... para el servicio: ' + propietario
    );
    console.log('Mis ServRel son: ' + serviciosRel);
  }

  traducirUsa(numP: string, serviciosHijos: any): string {
    // console.log("ENTRE AL USA PARA EL SERVICIO: " + propietario);
    // console.log("Los servicios usados son: " + serviciosUsados.service);
    // console.log(serviciosUsados);

    // const numP = this.documentCreator.devolverNumeroServicio(propietario);
    if (serviciosHijos.length == null) {
      // ESTO SIGNIFICA QUE ES SOLO 1 EL SERVICIO USADO.
      // this.documentCreator.agregarServicio(serviciosUsados.service.name);
      const numS = serviciosHijos;
      let regla = '-' + numP + ' ' + numS + ' 0 \n';
      // this.documentCreator.agregarRegla(regla);
      regla += '-' + numS + ' ' + numP + ' 0 \n';
      // this.documentCreator.agregarRegla(regla);

      return regla;
    } else {
      // ESTO SIGNIFICA QUE EXISTEN MAS DE 1 SERVICIO USADO.
      let regla = '';
      for (let i = 0; i < serviciosHijos.length; i++) {
        const numS = serviciosHijos[i];

        regla += '-' + numP + ' ' + numS + ' 0 \n';
        regla += '-' + numS + ' ' + numP + ' 0 \n';
      }

      return regla;
    }
  }

  traducirRequire(numP: string, serviciosHijos: any): string {
    let regla = '';
    if (serviciosHijos.length == null) {
      // Hay 1 require.
      const numS = serviciosHijos;
      regla = '-' + numP + ' ' + numS + ' 0 \n';
      return regla;
    } else {
      // Hay mas de 1 require.
      for (let i = 0; i < serviciosHijos.length; i++) {
        const numS = serviciosHijos[i];

        regla += '-' + numP + ' ' + numS + ' 0 \n';
      }
      return regla;
    }
  }

  traducirExclude(numP: string, serviciosHijos: any): string {
    // const numP = this.documentCreator.devolverNumeroServicio(propietario);
    let regla = '';
    if (serviciosHijos.length == null) {
      // Hay 1 exclude.
      const numS = serviciosHijos;
      regla = '-' + numP + ' -' + numS + ' 0 \n';
     return regla;
    } else {
      // Hay mas de 1 exclude.
      for (let i = 0; i < serviciosHijos.length; i++) {
        const numS = serviciosHijos[i];

        regla += '-' + numP + ' -' + numS + ' 0 \n';
      }
      return regla;
    }
  }
}

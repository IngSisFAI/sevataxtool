export interface Strategy {

 // TODO: agregar la relacion con el BUILDER (hay que crear una interface para dicho builder)


  servicios: any[]; // Arreglo que almacena el conjunto de servicios de la forma (nombreServicio, idServicio)
  stringRaices:string; //String encargado de mantener la numeracion de cada servicio
  stringTemp: string; // Cadena de texto que refleja las traducciones de cada punto variante.

  /* Declaramos los metodos que debe tener esta interface para que sea un Strategy valido */

  traducirServicio(servicio:any): void; //Metodo que se encarga de especificar para un servicio de terminado que traduccion es la necesaria.
  agregarServicio(nombre:string): void; //Este metodo se encarga de mantener un registro de los servicios usados para asi, llevar la numeracion de cada uno.

  traducirPuntoEspecifico(propietario: string ,punto: any): void; // TODO: definir esto.
  traducirPuntoGlobal(propietario: string ,punto: any): void;

  //Tipos de puntos variantes
  traducirMandatory(propietario: string ,serviciosRelacionados: any): void;
  traducirOpcional(propietario: string ,serviciosRelacionados: any): void;
  traducirAlternativo(propietario: string ,serviciosRelacionados: any): void;
  traducirVariante(propietario: string ,serviciosRelacionados: any): void;

  //Restricciones
  traducirUsa(propietario: string ,serviciosUsados: any): void;
  traducirRequire(propietario: string ,serviciosUsados: any): void;
  traducirExclude(propietario: string ,serviciosUsados: any): void;


  //metodos Auxiliares
  devolverNumeroServicio(nombre:string): number; //Metodo que busca en el arreglo de servicios, el servicio con name=nombre, y devuelve el numero asignado.

  agregarRegla(regla: string): void; //Metodo que se encarga de agregar al string final los resultados de los metodos traductores.


  confeccionarStringFinal():void;
}

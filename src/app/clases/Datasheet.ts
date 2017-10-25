
import { Service } from './Service';


export class Datasheet {
  private name: string;
  private services: Service[];

  constructor(){
    this.name = '';
    this.services = [];
  }

  public getName():string{return this.name};
  public setName(n:string){this.name = n};
  public getServices():Service[]{return this.services};
  public setServices(services:Service[]){this.services=services};
  public addService(newService:Service){this.services.push(newService)};
}

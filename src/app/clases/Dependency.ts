
import {Service} from './Service';

export class Dependency {

  private dependencyType:string;
  private service:Service;

  constructor(){
    this.dependencyType = '';
    this.service = null;
  }

  public getDependencyType():string{return this.dependencyType};
  public setDependencyType(dt:string){this.dependencyType=dt};
  public getService():Service{return this.service};
  public setService(sv:Service){this.service = sv};
}

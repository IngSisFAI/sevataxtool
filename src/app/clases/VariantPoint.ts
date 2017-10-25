
import {Service} from './Service';

export class VariantPoint {

  private variabilityType:string;
  private variants:Service[];

  constructor(){
    this.variabilityType = '';
    this.variants = [];
  }

  public getVariabilityType():string{return this.variabilityType};
  public setVariabilityType(vt:string){this.variabilityType=vt};
  public getVariants():Service[]{return this.variants};
  public setVariants(v:Service[]){this.variants=v};
  public addVariantService(s:Service){this.variants.push(s)};
}

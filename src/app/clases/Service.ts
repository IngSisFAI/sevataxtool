
import {VariantPoint} from './VariantPoint';
import {Dependency} from './Dependency';

export class Service {
  private name:string;
  private variationScope:string;
  private variationPoints: VariantPoint[];
  private Dependencies: Dependency[];

  constructor(){
    this.name = '';
    this.variationScope = '';
    this.variationPoints = [];
    this.Dependencies = [];
  }

  public getName():string{return this.name};
  public setName(name:string){this.name = name};
  public getVariationScope():string{return this.variationScope};
  public setVariationScope(scope:string){this.variationScope = scope};
  public getVariationPoints():VariantPoint[]{return this.variationPoints};
  public setVariationPoints(vp:VariantPoint[]){this.variationPoints=vp};
  public getDependencies():Dependency[]{return this.Dependencies};
  public setDependencies(dp:Dependency[]){this.Dependencies=dp};
  public addVariationPoint(vp:VariantPoint){this.variationPoints.push(vp)};
  public addDependecy(dp:Dependency){this.Dependencies.push(dp)};
}

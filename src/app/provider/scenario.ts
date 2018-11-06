
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Response} from "@angular/http";

import { Http } from '@angular/http';



@Injectable()
export class ScenarioProvider {

 private scenarios = ["",
    "False Optional",
    "Self Dependency",
    "V.P. Violation",
    "Constraint Contradition",
    "Alternative Inclusion",
    "Mandatory Exclusion",
    "Parent Exclusion",
    "Transitive Inconsistency",
    "Alternative Exclusion ",
    "Mandatory Inclusion",
    "Parent Inclusion",
    "Transitive Redundancy ",
    "False Specific",
    "Mandatory Specific",
    "Contradictory Scopes",
    "Cross redundancy",
    "Cross Inconsistency"

  ];

  private examples = [0,
    [],
    [
      "assets/datasheet/ModelError/ME01.json",
      "assets/datasheet/ModelError/ME02_self_dependency.json",
      "assets/datasheet/ModelError/ME03_self_dependency.json",
      "assets/datasheet/ModelError/ME04_self_dependency.json",
      "assets/datasheet/ModelError/ME05_self_dependency.json",
    ],
    [],
    [
      "assets/datasheet/DeadService/CC/DS01_Constraint_contradition.json",
      "assets/datasheet/DeadService/CC/DS02_Constraint_contradition.json",
      "assets/datasheet/DeadService/CC/DS03_Constraint_contradition.json",
    ],
    [
      "assets/datasheet/DeadService/AI/DS02_alternative_inclusion.json",
      "assets/datasheet/DeadService/AI/DS02_alternative_inclusion_01.json",
      "assets/datasheet/DeadService/AI/DS02_alternative_inclusion_02.json",
      "assets/datasheet/DeadService/AI/DS021_alternative_inclusion.json"

    ],
    [
      "assets/datasheet/DeadService/ME/DS03_Mandatory_exclusion.json",
      "assets/datasheet/DeadService/ME/DS03_Mandatory_exclusion01.json"
    ],
    [
      "assets/datasheet/DeadService/PE/parent_exclusion.json",
      "assets/datasheet/DeadService/PE/DS04_Parente_exclusion.json",
      "assets/datasheet/DeadService/PE/parent_exclusion_01.json",

    ],
    [
      "assets/datasheet/DeadService/TI/transitive_inconsistency.json",
      "assets/datasheet/DeadService/TI/transitive_inconsistency01.json"
    ],
    [
      "assets/datasheet/Redundancues/AE/alternative_Exclusion.json",
      "assets/datasheet/Redundancues/AE/alternative_Exclusion_01.json",
      "assets/datasheet/Redundancues/AE/alternative_Exclusion_02.json"

    ],
    [
      "assets/datasheet/Redundancues/MI/R03_Mandatory_inclusion.json"
    ],
    [
      "assets/datasheet/Redundancues/PI/parent_inclusion.json"
    ],
    [
      "assets/datasheet/Redundancues/Tr/transitive_inconsistency.json",
      "assets/datasheet/Redundancues/Tr/transitive_inconsistency01.json"
    ],
    [
      "assets/datasheet/scope/FS/scope_FS_01.json"
    ],
    [
      "assets/datasheet/scope/MS/scope_MandS_01.json"
    ],
    [
      "assets/datasheet/scope/CS/scope_FS_01.json"
    ]


  ];
  private details  = ["",
    "When a configurable service (Optional, Variant or Alternative) must be instantiated for all possible products. This can happen due to the presence of other dependencies, such as an includes, that affect the service.",
    "When a service has a dependency on itself. An includes dependency is an irrelevant case, but the excludes dependency generates inconsistencies",
    "The same variant belongs to two or more variation points into the same datasheet",
    "A service which includes other service that excludes the first",
    "A service which includes an alternative of it-self, or an alternative of some of its parents",
    "A service that excludes a mandatory service",
    "A service that excludes a parent service",
    "A service which includes and excludes the same service, or presents any transitive relationship of this case",
    "A service which excludes an alternative of itself, or an alternative of some of its parents",
    "A service that include a mandatory service",
    "A service that includes a parent service",
    "A set of services that presents includes generating a transitive redundancy",
    "If a Specific VP is related to an only one service or variant depending on a Global VP.",
    "If a Specific VP is conformed only by mandatory variant points. Then it can never contain different configurations.",
    "If a VP presents different scopes in different functional datasheets.",
    "Two or more datasheets, which present the same relationship of variability or dependence between 2 or more services.",
    "Two or more datasheets that present some type of inconsistency given by the services that are composed."
  ];


  constructor(public http: Http) {

  }
  getScenario(id:number){
    return this.scenarios[id];
}
getScenarioDetail(id:number){
    return this.details[id];
}
getExamples(id:number){
    return this.examples[id];
}
getDatasheet(id:number,id2:number): Observable<any> {
  return this.http.get(this.examples[id][id2])
    .map((response:Response) => {
      console.log("mock data" + response.json());
        return response.json();
    }
    );

}














}


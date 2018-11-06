import { Component, OnInit, ViewChild } from '@angular/core';

import { Datasheet } from '../clases/Datasheet';
import {ScenarioProvider} from "../provider/scenario";
import {Observable} from "rxjs";
import {Router} from "@angular/router";



@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

private title = "Select a  Validation Scenario";
private detail = "";
private datasheet :any;
private datasheet2 :  Observable<any>;
private buttons:any ;
private index =0;


  constructor( public scenario:ScenarioProvider,  public router:Router) {

  }

  ngOnInit() {
  }

private select(id:number) {
  this.title = this.scenario.getScenario(id);
  this.detail = this.scenario.getScenarioDetail(id);
  this.buttons = this.scenario.getExamples(id);
  this.index = id;

}
private loadDatasheet(id:number) {
  this.scenario.getDatasheet(this.index, id).subscribe(data => {
      console.log("aaaaaaaa", data);
      this.datasheet = data;
    }
  );
}

  private translate(id:number) {

    this.router.navigate(['/translate', this.index, id ]);
  }







}



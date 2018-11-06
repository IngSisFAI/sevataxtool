import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RepositoryComponent } from './repository/repository.component';


import { TranslateComponent } from './translate/translate.component';
import { VisualComponent } from './visual/visual.component';
import { StrategyCNFComponent } from './translate/strategy-cnf/strategy-cnf.component';
import { BuilderSATComponent } from './translate/builder-sat/builder-sat.component';
import { DocumentSATComponent } from './translate/document-sat/document-sat.component';
import { StrategyUsComponent } from './translate/strategy-us/strategy-us.component';
import { StrategySOLVERComponent } from './translate/strategy-solver/strategy-solver.component';
import { SolverScenariosComponent } from './solver-scenarios/solver-scenarios.component';
import {APP_ROUTING} from "./app.routes";
import {ScenarioProvider} from "./provider/scenario";


@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    RepositoryComponent,
    TranslateComponent,
    VisualComponent,
    StrategyCNFComponent,
    BuilderSATComponent,
    DocumentSATComponent,
    StrategyUsComponent,
    StrategySOLVERComponent,
    SolverScenariosComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpModule
  ],
  providers: [
    StrategyCNFComponent,
    BuilderSATComponent,DocumentSATComponent,
    StrategyUsComponent,StrategySOLVERComponent,
    ScenarioProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

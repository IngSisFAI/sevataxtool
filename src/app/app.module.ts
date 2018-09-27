import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TranslateComponent } from './translate/translate.component';
import { VisualComponent } from './visual/visual.component';
import { DocumentSATComponent } from './translate/document-sat/document-sat.component';
import { SolverScenariosComponent } from './solver-scenarios/solver-scenarios.component';

import { TranslatorCNFComponent } from './translate/translator-cnf/translator-cnf.component';
import { LogicRulesCNFComponent } from './translate/translator-cnf/logic-rules-cnf/logic-rules-cnf.component';
import { DocumentCreatorCNFComponent } from './translate/translator-cnf/document-creator-cnf/document-creator-cnf.component';
import { SolverConfigurationComponent } from './translate/solver-configuration-cnf/solver-configuration-sat.component';
import { StrategySOLVERComponent } from './translate/querys-cnf/strategy-solver.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TranslateComponent,
    VisualComponent,
    DocumentSATComponent,
    SolverScenariosComponent
  ],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [
    TranslatorCNFComponent,
    DocumentSATComponent,
    LogicRulesCNFComponent,
    DocumentCreatorCNFComponent,
    SolverConfigurationComponent,
    StrategySOLVERComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

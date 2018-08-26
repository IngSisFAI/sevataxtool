import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TranslateComponent } from './translate/translate.component';
import { VisualComponent } from './visual/visual.component';
import { StrategyCNFComponent } from './translate/strategy-cnf/strategy-cnf.component';
import { BuilderSATComponent } from './translate/builder-sat/builder-sat.component';
import { DocumentSATComponent } from './translate/document-sat/document-sat.component';
import { StrategyUsComponent } from './translate/strategy-us/strategy-us.component';
import { StrategySOLVERComponent } from './translate/strategy-solver/strategy-solver.component';
import { SolverScenariosComponent } from './solver-scenarios/solver-scenarios.component';

import { TranslatorCNFComponent } from './translate/translator-cnf/translator-cnf.component';
import { LogicRulesCNFComponent } from './translate/translator-cnf/logic-rules-cnf/logic-rules-cnf.component';
import { DocumentCreatorCNFComponent } from './translate/translator-cnf/document-creator-cnf/document-creator-cnf.component';
import { SolverConfigurationComponent } from './translate/solver-configuration-cnf/solver-configuration-sat.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TranslateComponent,
    VisualComponent,
    StrategyCNFComponent,
    BuilderSATComponent,
    DocumentSATComponent,
    StrategyUsComponent,
    StrategySOLVERComponent,
    SolverScenariosComponent
  ],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [
    StrategyCNFComponent,
    TranslatorCNFComponent,
    BuilderSATComponent,
    DocumentSATComponent,
    StrategyUsComponent,
    StrategySOLVERComponent,
    LogicRulesCNFComponent,
    DocumentCreatorCNFComponent,
    SolverConfigurationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

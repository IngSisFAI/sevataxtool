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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TranslateComponent,
    VisualComponent,
    StrategyCNFComponent,
    BuilderSATComponent,
    DocumentSATComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [StrategyCNFComponent,BuilderSATComponent,DocumentSATComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TranslateComponent } from './translate/translate.component';
import { VisualComponent } from './visual/visual.component';
import { StrategyCNFComponent } from './translate/strategy-cnf/strategy-cnf.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TranslateComponent,
    VisualComponent,
    StrategyCNFComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [StrategyCNFComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

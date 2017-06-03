import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TranslateComponent } from './translate/translate.component';
import { VisualComponent } from './visual/visual.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TranslateComponent,
    VisualComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

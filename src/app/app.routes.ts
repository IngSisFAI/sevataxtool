import { RouterModule, Routes } from '@angular/router';

import {TranslateComponent} from './translate/translate.component';
import {RepositoryComponent} from "./repository/repository.component";




const APP_ROUTES: Routes = [
  
  { path: 'translate/:id/:id1', component: TranslateComponent},
  { path: 'repository', component: RepositoryComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'translate/2/0' }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});

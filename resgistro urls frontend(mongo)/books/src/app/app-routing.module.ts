import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { NotFoundError } from 'rxjs';

const routes: Routes = [
  {path: '', component:PrincipalComponent},
  {path: '404', component:NotFoundError},
  {path: '**', component:NotFoundError}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

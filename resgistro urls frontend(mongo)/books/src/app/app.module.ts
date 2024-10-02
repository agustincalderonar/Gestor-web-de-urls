import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {AngularFireModule} from '@angular/fire/compat';
import {enviroment} from 'src/enviroments/enviroment';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { ListadoUrlsComponent } from './componentes/listado-urls/listado-urls.component';
import { UrlComponent } from './componentes/url/url.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    FormularioComponent,
    ListadoUrlsComponent,
    UrlComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(enviroment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

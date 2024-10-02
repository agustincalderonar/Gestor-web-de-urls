import { FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';
import { Component } from '@angular/core';
import { UrlsService } from 'src/app/servicios/urls.service';
import { Url } from 'src/app/clases/url';
import { UUID } from 'angular2-uuid';
import { Categoria } from 'src/app/clases/categoria';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  formularioAnadir: FormGroup;
  constructor(private urlsService: UrlsService, private fb: FormBuilder) { 
    this.crearFormulario();
  }

  crearFormulario(){
    const validationPatternUrl = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/
    
    this.formularioAnadir = this.fb.group({
      'link': ['', [Validators.required, Validators.minLength(5), Validators.pattern(validationPatternUrl)]],
      'nombre': ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  get linkNoValido(){
    return this.formularioAnadir.get('link')?.invalid && this.formularioAnadir.get('link')?.touched
  }
  get nombreNoValido(){
    return this.formularioAnadir.get('nombre')?.invalid && this.formularioAnadir.get('nombre')?.touched
  }

  anadirUrl(link:HTMLInputElement, nombre:HTMLInputElement, deporte:HTMLInputElement, cocina:HTMLInputElement, juegos:HTMLInputElement){
    if(this.formularioAnadir.get('link')?.invalid || this.formularioAnadir.get('nombre')?.invalid || nombre.value=="" || link.value==""){
      console.log("Datos erroneos")
    }
    else{
      var categorias : string[] = [];
      if(deporte.checked) categorias.unshift('Deporte')
      if(cocina.checked) categorias.unshift('Cocina')
      if(juegos.checked) categorias.unshift('Juegos')

      this.urlsService.anadirUrls(nombre.value, link.value, categorias)
      console.log(nombre.value, link.value, categorias)
      nombre.value="";
      link.value="";
      deporte.checked = false;
      cocina.checked = false;
      juegos.checked = false;
    }
  }

}

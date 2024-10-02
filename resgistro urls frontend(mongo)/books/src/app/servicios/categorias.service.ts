import { Injectable } from '@angular/core';
import { Categoria } from '../clases/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  listaCategorias : Categoria[] = [new Categoria('Cocina'), new Categoria('Deporte'), new Categoria('Juegos')]

  constructor() { }

  obtenerCategorias(){
    return this.listaCategorias;
  }
}

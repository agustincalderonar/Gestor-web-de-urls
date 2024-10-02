import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from 'src/app/clases/categoria';
import { CategoriasService } from 'src/app/servicios/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {

  @Input() categoria:any;
  @Input() selectedCategoria: string;
  @Output() categoriaFiltro = new EventEmitter();
  @Output() categoriaSeleccionada = new EventEmitter<string>();


  constructor(private categoriasService: CategoriasService){
  }

  ngOnInit(): void {
  }

  filtrarUrl(categoria:Categoria){
    this.categoriaSeleccionada.emit(categoria.nombreCategoria);

    this.categoriaFiltro.emit(this.categoria)
  }
}

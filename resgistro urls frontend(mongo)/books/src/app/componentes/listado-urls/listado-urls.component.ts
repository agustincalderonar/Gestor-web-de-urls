import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Url } from 'src/app/clases/url';
import { Categoria } from 'src/app/clases/categoria';
import { UrlsService } from 'src/app/servicios/urls.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';


@Component({
  selector: 'app-listado-urls',
  templateUrl: './listado-urls.component.html',
  styleUrls: ['./listado-urls.component.css']
})
export class ListadoUrlsComponent implements OnInit{

  listaUrls : Url[] = [];
  listaTodasUrls : Url[] = [];
  listaCategorias : Categoria[] = [];
  selectedCategoria: string;

  constructor(private urlsService: UrlsService, private categoriasService: CategoriasService) {
    this.listaUrls = this.urlsService.obtenerUrls();
    this.listaCategorias = this.categoriasService.obtenerCategorias();
    this.selectedCategoria = "Todas"
   }

  ngOnInit(): void {
  }

  favoritaUrl(url:Url){
    this.urlsService.favoritaUrl(url);
  }
  eliminarUrl(_id:string){
    this.urlsService.eliminarUrl(_id);
  }

  mostrarTodas(){
    this.selectedCategoria = 'Todas'; 

    this.listaUrls = this.urlsService.obtenerUrls();
  }
  filtrarUrl(categoria:Categoria){
    this.selectedCategoria = categoria.nombreCategoria; 

    this.listaTodasUrls = this.urlsService.obtenerUrls();
    this.listaUrls = [];
    this.listaUrls = this.listaTodasUrls.filter(url => url.categorias.includes(categoria.nombreCategoria))
  }

}

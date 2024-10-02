import { Injectable } from '@angular/core';
import { Url } from '../clases/url';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UrlsService {

  listaUrls: Url[] = [];


  constructor(private http: HttpClient){
    this.obtenerUrlsMongo();
  }

  anadirUrls(nombre:string, link:string, categorias:string[]){
    const urlPeticion = "http://localhost:8080/api/urls/"
    const body = {
      "nombre": nombre,
      "link": link,
      "categorias": categorias,
      "favorita": false
    }
    this.http.post(urlPeticion, body).subscribe({
      next: (result) => {
        console.log("URL añadida correctamente");
        this.obtenerUrlsMongo();
      },
      error: (error) => {
        console.error("Error al añadir la URL:", error);
      }
    });
  }

  obtenerUrlsMongo(){
    const urlPeticion = "http://localhost:8080/api/urls/"
    fetch(urlPeticion)
      .then(response => response.json())
      .then(jsonData => {
        // Vaciamos la lista y le agregamos las urls recuperadas
        this.listaUrls.length = 0;
        jsonData.data.map((url: { _id: string, nombre: string, link: string, categorias: string[], favorita: boolean }) => {
          const urlImportada = new Url(url._id,url.nombre, url.link, url.categorias, url.favorita);
          //inserta a los favoritos al principio
          if(url.favorita)this.listaUrls.unshift(urlImportada)
          else this.listaUrls.push(urlImportada)
        });
        console.log("Objetos obtenidos:", this.listaUrls);
      })
      .catch(error => console.error("Error al obtener los objetos:", error));
  }

  obtenerUrls(){
    return this.listaUrls;
  }

  favoritaUrl(url:Url){
    //modificamos la base de datos
    const urlPeticion = "http://localhost:8080/api/urls/" + url._id
    this.http.put(urlPeticion, null).subscribe({
      next: (result) => {
        console.log("URL modificada correctamente");
      },
      error: (error) => {
        console.error("Error al modificar la URL:", error);
      }
    });

    //lo modificamos en local para ahorrar recursos
    let posicion = this.listaUrls.findIndex(urlBusco => urlBusco.link === url.link);
    url.favorita = !url.favorita
    if(url.favorita){
      this.listaUrls.unshift(url);
      this.listaUrls.splice(posicion+1,1);
    }
    else{
      this.listaUrls.push(url);
      this.listaUrls.splice(posicion,1);
    }
  }

  eliminarUrl(_id:string){
    const urlPeticion = "http://localhost:8080/api/urls/" + _id
    this.http.delete(urlPeticion).subscribe({
      next: (result) => {
        console.log("URL eliminada correctamente");
        this.obtenerUrlsMongo();
      },
      error: (error) => {
        console.error("Error al eliminar la URL:", error);
      }
    });
    this.obtenerUrlsMongo
  }
}


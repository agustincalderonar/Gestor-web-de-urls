import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Url } from 'src/app/clases/url';
import { UrlsService } from 'src/app/servicios/urls.service';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent {
  
  @Input() url:any;
  @Output() urlFavorita = new EventEmitter();
  @Output() urlEliminada = new EventEmitter();

  constructor(private urlsService: UrlsService) { }

  ngOnInit(): void {
  }

  goToUrl(link:string){
     window.open(link);
  }

  favoritaUrl(url : Url){
    this.urlFavorita.emit(url);
  }

  eliminarUrl(_id:string){
    this.urlEliminada.emit(_id);
  }
}
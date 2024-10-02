
export class Url {
  _id : string;
  nombre: string;
  link: string;
  categorias: string[];
  favorita: boolean;

  
  constructor(_id : string, nombre: string, link: string, categorias: string[], favorita: boolean){
    this._id = _id
    this.nombre = nombre;
    this.link = link;
    this.categorias = categorias;
    this.favorita = favorita;
  }
  
/*
  constructor(nombre: string, link: string, categorias: string[], favorita: boolean){
    this.nombre = nombre;
    this.link = link;
    this.categorias = categorias;
    this.favorita = favorita;
  }
  */
}

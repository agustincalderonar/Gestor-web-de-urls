const MongoLib = require('../lib/mongo');

class UrlsService {

    constructor(){
        this.collection = 'urls';

        //con esto enlazamos con nuestra db de mongo
        this.mongoDB = new MongoLib();
    }

    async getUrls({tags}) {
        const query = tags ;
        const urls = await this.mongoDB.getUrls(this.collection, query);
        return urls || [];
    }

    async getUrl(urlId){
        const url = await this.mongoDB.getUrl(this.collection, urlId);
        return url || [];
    }

    async crearUrl({url}){
        const urlCreadaId = await this.mongoDB.anadirUrl(this.collection, url);
        return urlCreadaId || [];
    }

    async favoritaUrl( urlId, url = {}){
        const urlActualizadaId = await this.mongoDB.favoritaUrl(this.collection, urlId, url);
        return urlActualizadaId || [];
    }

    async borrarUrl( urlId ){
        const urlBorradaId = await this.mongoDB.borrarUrl(this.collection, urlId);
        console.log(`url borrada ${urlBorradaId}`)
        return urlBorradaId || [];
    }
    
}

module.exports = UrlsService
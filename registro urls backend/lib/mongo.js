const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config/index')

//aqui enlazamos con la db definida en config
const USER = config.DB_USER
const PASSWORD = config.DB_PASSWORD

const DB_NAME_REMOTO = config.DB_NAME_REMOTO
const DB_HOST_REMOTO = config.DB_HOST_REMOTO

//const MONGO_URI = `mongodb://${DB_HOST_LOCAL}:${DB_PORT_LOCAL}/${DB_NAME_LOCAL}?retryWrites=true&w=majority`    // _____ BBDD Local ___

const MONGO_URI = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST_REMOTO}/${config.DB_NAME_REMOTO}?retryWrites=true&w=majority`


class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = config.DB_NAME_REMOTO;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject("error en la conexión con la BBDD ", err);
                    }
                    console.log('Conectado a la BBDD');
                    resolve(this.client.db(this.dbName));
                })
            })
        }
        return MongoLib.connection;
    }

    getUrls(collection, query) {
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        })
    }

    getUrl(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) })
        })
    }

    anadirUrl(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data)
        }).then(result => result.insertedId);
    }

    favoritaUrl(collection, id, data) {
        return this.connect().then(db => { 
            return db.collection(collection).findOne({ _id: ObjectId(id) }) }).then(url => {
            const valorFavorita = url.favorita;

            return this.connect().then(db => { 
                return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: { favorita: !valorFavorita } }, { upsert: true })
            })
        }).then(result => result.insertedId || id);
    }

    borrarUrl(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) })

        }).then(() => id)
    }
}

module.exports = MongoLib;
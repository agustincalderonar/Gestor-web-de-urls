const express = require('express')
const app = express()
const cors = require('cors');

const urlsAPI = require('./rutas/urls')


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//con esto enlazamos nuestras rutas con la app
urlsAPI(app)

var server = app.listen('8080', () => {
    console.log(`Servidor escuchando en ${server.address().port}`)
})
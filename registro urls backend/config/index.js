// Es mejor colocar todos los valores de configuración en un fichero
// Posteriormente importaremos este fichero allí donde sea necesario

require('dotenv').config();

const config = {

     port: process.env.PORT | 8080, // los servidores en la nube decidirán el puerto
     DB_USER : 'acalderonarinf',
     DB_PASSWORD : 'qwertyuiop',
     DB_NAME_REMOTO : 'urls',
     DB_HOST_REMOTO : 'cluster0.ngrhgdm.mongodb.net',
}

module.exports = {config}


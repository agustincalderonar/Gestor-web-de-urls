const express = require('express');

const UrlsService = require('../servicios/urlsService');

function urlsAPI(app) {
    const router = express.Router();
    // app.use(express.static('dist/todo'));

    app.use('/api/urls', router);

    //con esto enlazamos con el service y le hacemos peticiones
    const urlsService = new UrlsService();

    //obtener todas las urls
    router.get('/', async function (req, res, next) {
        const tags = req.query;

        try {
            const urls = await urlsService.getUrls({tags});
            res.status(200).json(
                {
                    data: urls,
                    message: 'listado de urls devuelto con éxito'
                }
            )
        } catch (err){
            next(err);
        }
    })

    //obtener url por id
    router.get('/:urlId', async function (req, res, next) {
        const {urlId}  = req.params;  // const urlId = req.params.urlId;
        try {
            const url = await urlsService.getUrl(urlId);
            res.status(200).json({
                data: url,
                message: 'url devuelta con éxito'
            });
        } catch (err) {
            next(err);
        }
    })

    //añadir url
    router.post('/', async function (req, res, next) {
        const { body: url } = req; // body = req.body; url = body  / los : definen un alias
        try {
            const nuevaUrl = await urlsService.crearUrl({url});

            res.status(201).json({
                data: nuevaUrl,
                message: 'url añadida con éxito'
            });
        } catch (err) {
            next(err);
        }
    })

    //editar favorita url
    router.put('/:urlId', async function (req, res, next) {
        const  {urlId}  = req.params;
        const  nuevaUrl  = req.body; 

        try {
            const urlActualizada = await urlsService.favoritaUrl(urlId, nuevaUrl);
            console.log(nuevaUrl)

            res.status(200).json({
                data: urlActualizada,
                message: 'url actualizada con éxito'
            });
        } catch (err) {
            next(err);
        }

    })

    //eliminar url
    router.delete('/:urlId', async function (req, res, next) {
        const  {urlId}  = req.params;

        try {
            const urlBorrada = await urlsService.borrarUrl(urlId);

            res.status(200).json({
                data: urlBorrada,
                message: 'url borrada con éxito'
            });
        } catch (err) {
            next(err);
        }

    })

}

module.exports = urlsAPI;
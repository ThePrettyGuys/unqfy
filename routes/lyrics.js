let express= require('express');
let MusixMatchService = require ( '../unqfy/services/musixmatchService')
let app= express();

//Rutas
app.get('/', (req, res, next ) => {

    let lyrics= new MusixMatchService().getLyrics("Queen", "Don't stop me now")


    res.status(200).json({
        ok: true,
        result: lyrics
    })
});

module.exports = app;
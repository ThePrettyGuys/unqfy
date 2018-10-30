let express= require('express');
let MusixMatchService = require ( '../unqfy/services/musixmatchService');
let fileName= require('../config/config').FILENAME;
const UnqfyFileSystem = require('../unqfy/unqfyFileSystem');
const UnqfyRepository = require('../unqfy/repositorys/unqfyRepository');
let app= express();

//Rutas
app.get('/', (req, res, next ) => {
    let lyricsName = req.query.name;

    let unqfyRepository = new UnqfyRepository();
    let unqfyFileSystem = new UnqfyFileSystem(unqfyRepository);
    let unqfy = unqfyFileSystem.getUNQfy(fileName);

    let lyrics= unqfy.getLyrics("Queen", "Amor")

    lyrics.then(letra => res.status(200).json({
        ok: true,
        result: letra
    }))
});

module.exports = app;
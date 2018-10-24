let express= require('express');
let app= express();
let fileName= require('../config/config').FILENAME;
const UnqfyFileSystem = require('../unqfy/unqfyFileSystem');
const UnqfyRepository = require('../unqfy/repositorys/unqfyRepository');

//Rutas
app.get('/', (req, res, next ) => {

    let unqfyRepository = new UnqfyRepository();
    let unqfyFileSystem = new UnqfyFileSystem(unqfyRepository);
    let unqfy = unqfyFileSystem.getUNQfy(fileName);

    let resultado= unqfy.getAllArtists();

    res.status(200).json({
        ok: true,
        results: resultado
    })
});

module.exports = app;
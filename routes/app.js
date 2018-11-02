let express= require('express');
let app= express();
let fileName= require('../config/config').FILENAME;
const UnqfyFileSystem = require('../unqfy/unqfyFileSystem');
const UnqfyRepository = require('../unqfy/repositorys/unqfyRepository');
let unqfyRepository = new UnqfyRepository();
let unqfyFileSystem = new UnqfyFileSystem(unqfyRepository);
let unqfy = unqfyFileSystem.getUNQfy(fileName);

//Rutas
app.get('/', (req, res) => {
    res.send(200)
});

module.exports = app;
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

//Rutas artist
app.get('/artists/:id', (req, res, next ) => {
    let resultado= unqfy.getArtistById(req.params.id);
    res.status(200).json(resultado)
});

app.delete('/artists/:id', (req, res, next ) => {
    let resultado= unqfy.deleteArtistById(req.params.id);
    res.status(204).json({})
});

app.get('/artists', (req, res, next ) => {
    try{
        if(req.query.name){
            var resultado= unqfy.getArtistsWhoContainInName(req.query.name);
        } else {
            var resultado= unqfy.getAllArtists(); 
        }
        res.status(200).json({resultado})
    }
    catch(err){
        res.status(404).json({
            "status": 404,
            "errorCode": "RESOURCE_NOT_FOUND"
        })
    }
});

app.post('/artists', (req, res) => {
    try {
        let result = unqfy.addArtist(req.body)
        res.status(201).json(result)
    }
    catch(err){
        res.status(409).json({
            "status": 409,
            "errorCode": "RESOURCE_ALREADY_EXISTS"
        })
    }
});

app.post('/artists/populate', (req, res) => {
    let result = unqfy.populateAlbumsForArtist(req.query.name)
    res.status(201).json(result)
});

//Routes albums
app.post('/albums', (req, res, next ) => {
    console.log(req)
    let albumData = { name: req.body.name, year: req.body.year };
    try {
        let result = unqfy.addAlbumToId(req.body.artistId, albumData)
        res.status(201).json(result)
    }
    catch(err){
        res.status(err.type).json({
            "status": err.type,
            "errorCode": err.keyToFind
        })
    }
});

app.get('/albums/:id', (req, res, next ) => {
    let resultado= unqfy.getAlbumById(req.params.id);
    res.status(200).json(resultado)
});

app.get('/albums', (req, res, next ) => {
    var resultado= unqfy.getAlbumsWhichContainInName(req.query.name);
    res.status(200).json(resultado)
});

app.delete('/albums/:id', (req, res, next ) => {
    let resultado= unqfy.deleteAlbumById(req.params.id);
    res.status(200).json({
        ok: true,
        results: resultado
    })
});

module.exports = app;
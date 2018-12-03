const Unqfyer = require('../unqfyer.js');
let unqfyer = new Unqfyer();

exports.addAlbumToArtist = function(req, res, next ) {
    let albumData = { name: req.body.name, year: req.body.year };
    try {
        let result = unqfyer.get().addAlbumToId(req.body.artistId, albumData);
        unqfyer.save();
        res.status(201).json(result)
    }
    catch(err){
        res.status(err.type).json({
            "status": err.type,
            "errorCode": err.keyToFind
        })
    }
};

exports.albumById = function(req, res, next ) {
    try {
        let resultado = unqfyer.get().getAlbumById(req.params.id);
        res.status(200).json(resultado)
    }
    catch (err) {
        res.status(404).json({
            "status": 404,
            "errorCode": "RESOURCE_NOT_FOUND"
        })
    }
};

exports.albumsByName = function(req, res, next ) {
    try{
        let resultado;
        if(req.query.name){
            resultado = unqfyer.get().getAlbumsWhichContainInName(req.query.name);
        } else {
            resultado = unqfyer.get().getAllAlbums();
        }
        res.status(200).send(resultado);
    }
    catch(err){
        res.status(404).json({
            "status": 404,
            "errorCode": "RESOURCE_NOT_FOUND"
        })
    }
};

exports.deleteAlbum = function (req, res, next) {
    try {
        let resultado = unqfyer.get().deleteAlbumById(req.params.id);
        unqfyer.save();
        res.status(204).json({
            ok: true,
            results: resultado
        })
    }
    catch (err) {
        res.status(404).json({
            "status": 404,
            "errorCode": "RESOURCE_NOT_FOUND"
        })
    }
};
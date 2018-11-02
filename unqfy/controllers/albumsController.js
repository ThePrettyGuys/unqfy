const Unqfyer = require('../unqfyer.js');
let unqfyer = new Unqfyer();

exports.addAlbumToArtist = function(req, res, next ) {
    let albumData = { name: req.body.name, year: req.body.year };
    try {
        let result = unqfyer.get().addAlbumToId(req.body.artistId, albumData)
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
    let resultado = unqfyer.get().getAlbumById(req.params.id);
    res.status(200).json(resultado)
};

exports.albumsByName = function(req, res, next ) {
    var resultado = unqfyer.get().getAlbumsWhichContainInName(req.query.name);
    res.status(200).json(resultado)
};

exports.deleteAlbum = function(req, res, next ) {
    let resultado= unqfyer.get().deleteAlbumById(req.params.id);
    res.status(200).json({
        ok: true,
        results: resultado
    })
};
const Unqfyer = require('../unqfyer.js');
let unqfyer = new Unqfyer();

exports.artistById = function(req, res, next ) {
    try{
        let resultado = unqfyer.get().getArtistById(req.params.id);
        res.status(200).json(resultado);
    }
    catch(err){
        res.status(404).json({
            "status": 404,
            "errorCode": "RESOURCE_NOT_FOUND"
        })
    }
};

exports.index = function(req, res, next ) {
    try{
        let artistas;
        let artistName = req.query.name;
        if(artistName){
            artistas = unqfyer.get().getArtistsWhoContainInName(artistName);
        } else {
            artistas = unqfyer.get().getAllArtists();
        }
        res.status(200).send(artistas);
    }
    //Acá se debería diferenciar que excepción se está tirando
    catch(err){
        res.status(404).json({
            "status": 404,
            "errorCode": "RESOURCE_NOT_FOUND"
        })
    }
};

exports.addArtist = function(req, res, next) {
    try {
        let result = unqfyer.get().addArtist(req.body);
        console.log(`hasta acá todo bien antes del save..: ${result.name} y c: ${result.country}, id: ${result.id}`);
        unqfyer.save();
        console.log(`hasta acá todo bien luego del save..: ${result.name} y c: ${result.country}, id: ${result.id}`);
        res.status(201).json(result)
    }
    catch(err){
        res.status(err.type).json({
            "status": err.type,
            "errorCode": err.keyToFind
        })
    }
};

exports.deleteArtist = function(req, res, next ) {
    try {
        unqfyer.get().deleteArtistById(req.params.id);
        unqfyer.save();
        res.status(204).json({})
    }
    catch(err){
        res.status(404).json({
            "status": 404,
            "errorCode": "RESOURCE_NOT_FOUND"
        })
    }
};

exports.populateArtist = function(req, res, next) {
    try {
        unqfyer.get().populateAlbumsForArtist(req.query.name)
        .then(result => {
            unqfyer.save();
            res.status(200).json(result);
        });
    }
    catch(err){
        res.status(409).json({
            "status": 409,
            "errorCode": "RESOURCE_ALREADY_EXISTS"
        })
    }
};

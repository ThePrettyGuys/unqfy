const Unqfyer = require('../unqfyer.js');
let unqfyer = new Unqfyer();

exports.artistById = function(req, res, next ) {
    let resultado = unqfyer.get().getArtistById(req.params.id);
    res.status(200).json(resultado);
};

exports.index = function(req, res, next ) {
    try{
        if(req.query.name){
            var resultado = unqfyer.get().getArtistsWhoContainInName(req.query.name);
        } else {
            var resultado = unqfyer.get().getAllArtists();
        }
        res.status(200).json({resultado})
    }
    catch(err){
        res.status(404).json({
            "status": 404,
            "errorCode": "RESOURCE_NOT_FOUND"
        })
    }
};

exports.addArtist = function(req, res) {
    try {
        let result = unqfyer.get().addArtist(req.body);
        unqfyer.save();
        res.status(201).json(result)
    }
    catch(err){
        res.status(409).json({
            "status": 409,
            "errorCode": "RESOURCE_ALREADY_EXISTS"
        })
    }
};

exports.deleteArtist = function(req, res, next ) {
    unqfyer.get().deleteArtistById(req.params.id);
    unqfyer.save();
    res.status(204).json({})
};

exports.populateArtist = function(req, res) {
    try {
        unqfyer.get().populateAlbumsForArtist(req.query.name)
        .then(result => {
            console.log(result);
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

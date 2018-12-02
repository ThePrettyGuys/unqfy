const Unqfyer = require('../unqfyer.js');
let unqfyer = new Unqfyer();

exports.index = function(req, res, next ) {
    try {
        unqfyer.get().getLyrics(req.query.trackId)
            .then(result => {
                res.status(200).json(result);
            });
    }
    catch(err){
        res.status(404).json({
            "status": 404,
            "errorCode": "RESOURCE_NOT_FOUND"
        })
    }
}



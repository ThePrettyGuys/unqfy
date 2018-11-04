const Unqfyer = require('../unqfyer.js');
let unqfyer = new Unqfyer();

exports.index = function(req, res, next ) {
    unqfyer.get().getLyrics(req.query.trackId)
    .then(result => {
        res.status(200).json(result);
    });
}


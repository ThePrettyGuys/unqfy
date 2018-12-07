const Unqfyer = require('../unqfyer.js');
let unqfyer = new Unqfyer();

exports.addTrackTo = function(req, res, next) {
    try {
        const albumName = req.body.albumName;
        const artistName = req.body.artistName;
        const trackData = req.body.track;
        let trackAdded = unqfyer.get().addTrackTo(albumName, artistName, trackData);

        unqfyer.save();
        res.status(201).json(trackAdded)
    }
    catch(err){
        res.status(err.type).json({
            "status": err.type,
            "errorCode": err.keyToFind
        })
    }
};

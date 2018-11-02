let express= require('express');
let app= express();
let albumsController = require('../unqfy/controllers/albumsController');

app.post('/', albumsController.addAlbumToArtist);

app.get('/:id', albumsController.albumById);

app.get('/', albumsController.albumsByName);

app.delete('/:id', albumsController.deleteAlbum);

module.exports = app;
let express= require('express');
let app= express();
let artistsController = require('../unqfy/controllers/artistsController');

app.get('/', artistsController.index);

app.get('/:id', artistsController.artistById);

app.delete('/:id', artistsController.deleteArtist);

app.post('/', artistsController.addArtist);

app.post('/populate', artistsController.populateArtist);

module.exports = app;
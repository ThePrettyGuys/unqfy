let express= require('express');
let app= express();
let tracksController = require('../unqfy/controllers/tracksController');

app.post('/', tracksController.addTrackTo);

module.exports = app;
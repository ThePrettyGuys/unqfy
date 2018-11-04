let express= require('express');
let app= express();
let lyricsController = require('../unqfy/controllers/lyricsController');

app.get('/', lyricsController.index);

module.exports = app;
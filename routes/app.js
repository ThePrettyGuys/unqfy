let express= require('express');
let app= express();

//Rutas
app.get('/', (req, res) => {
    res.send(200)
});

module.exports = app;
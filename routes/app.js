let express= require('express');
let app= express();

//Rutas
app.get('/', (req, res, next ) => {

    res.status(200).json({
        ok: true,
    })
});

module.exports = app;
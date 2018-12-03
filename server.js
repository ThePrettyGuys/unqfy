/**
 * HowTo: Definir nuevas rutas:
 * - Definir la ruta en la carpeta rutas, segun buenas practicas.
 * - Importarla en este archivo, en la parte de Importar rutas
 * - Declararla en la app, mediante app.use(), debajo de la importacion de rutas.
 */

// Requires
let express= require ('express');
let bodyParser= require ('body-parser');
const SERVER_PORT = require('./config/config').SERVER_PORT;


// Inicializar variables
let app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// Body Parser
//parse application/ x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
//parse application/json
app.use(bodyParser.json());


// Importar rutas
let appRoutes = require('./routes/app');
let artistRoutes = require('./routes/artists');
let albumRoutes = require('./routes/albums');
let lyricRoutes = require('./routes/lyrics');

// Rutas
app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/lyrics', lyricRoutes);
app.use('/', appRoutes)


app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({
            "status": 400,
            "errorCode": "BAD_REQUEST"
        })
    }

    next();
});


// Escuchar peticiones
app.listen(SERVER_PORT, () => {
    console.log(`Express Server puerto ${SERVER_PORT}: \x1b[32m%s\x1b[0m`, 'online');
});
/**
 * HowTo: Definir nuevas rutas:
 * - Definir la ruta en la carpeta rutas, segun buenas practicas.
 * - Importarla en este archivo, en la parte de Importar rutas
 * - Declararla en la app, mediante app.use(), debajo de la importacion de rutas.
 */

// Requires
let express= require ('express');
let bodyParser= require ('body-parser');


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
let artistRoutes = require('./routes/artist');
let lyricsRoutes = require ( './routes/lyrics');


// Rutas
/**
 * Es posicional.... La raiz siempre debe quedar a lo ultimo!
 */
app.use('/artists', artistRoutes);
app.use('/api/lyrics', lyricsRoutes);
app.use('/', appRoutes);



// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});
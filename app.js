//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Inicializar variables
var app = express();

//body parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');


//Conexion 
/*mongoose.connection.openUri('mongodb://127.0.0.1:27022/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos \x1b[32m%s\x1b[0m', 'online');

})*/

var db = 'mongodb://127.0.0.1:27022/hospitalDB';
// Use connect method to connect to the Server    
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }

    console.log('Base de datos \x1b[32m%s\x1b[0m', 'online');
});

//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server corriendo en el puerto 3000 \x1b[32m%s\x1b[0m', 'online');
});
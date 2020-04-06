//exportaciones
require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// Habilita CORS
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader(
'Access-Control-Allow-Headers',
'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
);
res.setHeader(
'Access-Control-Allow-Methods',
'GET, POST, PATCH, PUT, DELETE, OPTIONS'
);
next();
});

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //url amistosa, captura los datos del formulario
//Parse de formato a application/json
app.use(bodyParser.json());
//Archivo agrupador de rutas
app.use(require('./routes/index'));

//useNewUrlParser 
//Conexión a la BD
mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, resp) => {
        if (err) throw err;

        console.log('Base de datos ONLINE');
    });

//Puerto de escucha de la aplicación
app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto 3000', process.env.PORT);
});
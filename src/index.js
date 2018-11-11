//nodemon: dependencia de desarrollo que facilita el cierre y despliegue del servidor cuando ocurren cambios
const express = require('express'); //framework para crear un servidor
const morgan = require('morgan'); //muestra el detalle de las peticiones al servidor y los muestra en consola
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://LuisGH1234:7PbvVMncmsE6Ttj@cluster0-yldiz.mongodb.net/test?retryWrites=true')
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));
//Settings
/*
    * En el despliegue de esta aplicacion, el servicio de la nube nos otorgara un puerto.
    * process.env.PORT: contiene el puerto que nos da el servidor 
*/
app.set('port', process.env.PORT || 3000);

//Middlewares
/*
    * parametro dev en morgan indica que se quiere ver un mensaje corto por consola
    * .json: cada vez que se envie un JSON al servidor este pueda entenderlo procesandolo
*/
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', require('./routes/videotecs'));

//Static files: 
/* 
    * Los archivos estaticos son quellos que enviamos al navegador, por ejemplo, html, js, css, imagenes.
    * Se llaman estaticos porque el servidor solo los envia una vez y el usuario (navegador) los consume.
    * __dirname es la ruta de en donde esta la carpeta que contiene este archivo index.js (Carpeta: src)
    * El servidor enviara la capreta public al navegador y este lee por defecto los .html
*/
app.use(express.static(`${__dirname}/public`));

//Server init
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});
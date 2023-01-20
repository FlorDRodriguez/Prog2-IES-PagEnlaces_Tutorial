//archivo que comienza la app 

const express = require ('express');
const morgan = require ('morgan');
const path = require('path');//path permite poder manejar las rutas   
const { engine } = require('express-handlebars');
const session = require ('express-session')
const validator = require('express-validator');
const passport = require('passport');//es un midleware
const flash = require('connect-flash');//almacena los datos
const MySQLStore = require('express-mysql-session');//para guardar la sesión en la db

const { database } = require ('./keys');//es un archivo donde esta la conección a la db
//solo quiero la propiedad database

//INICIALIZACION
const app = express();//cuando express se ejecuta devuelve un objeto que se almacena en app
require('./lib/passport');//p que la app se entere de la autentificacion que estoy creando

//CONFIGURACIONES
app.engine('handlebars', engine());
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//MIDDLEWARS: funciones que se ejecutan cada vez que un usuario envia una petición al serv
app.use(morgan('dev'));//muestra un mje por consola
app.use(express.urlencoded({extended:false}));//urlencoded sirve para aceptar los datos de los formularios
//solo acepta datos sencillos

app.use(session({
  secret: 'appSession',
  resave: false, //para que no se renueve la sesión
  saveUninitialized: false,//para que no se vuelva a establecer la sesión
  store: new MySQLStore(database)//donde se almacena la sesión
}));

app.use(flash());//para mensajes
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); //para enviar y recibir json

app.use(passport.initialize())//
app.use(passport.session());


//VAR GLOBALES
app.use((req, res, next) => {
  app.locals.success = req.flash('success'); //este mje va a estar disponible para todas las vistas
  app.locals.user = req.user;
  next();
});
//toma info del usuario, lo que el serv quiere responder y una funcion para continuar con el resto del cod  

//RUTAS: urls del servidor
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//ARCHIVOS PÚBLICOS

// COMIENZO: comenzar el serv
app.listen(app.get('port'), () => {
    console.log ('Servidor en el puerto',  app.get('port'));
}) //app escucha en el puerto elegido

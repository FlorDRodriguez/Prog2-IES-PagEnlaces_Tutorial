
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signup', new LocalStrategy({//creo la autentificacion
    /* 1er parametro:nombre de la estrategia que se utilizará para identificarla
    2do: tipo de estrategia que desea crear*/
    //LocalStrategy espera encontrar las credenciales de usuario en los parámetros usernameField y passwordFiel  
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //para obtener datos adicionales
}, async (req, username, password, done) => {

    const { fullname } = req.body; 
    let newUser = { //es un objeto
        fullname,
        username,
        password
        //fullname no lo recibo como parámetro pq está dentro de req.body
    };

    //consulta a la base de datos
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', newUser);
    console.log(result);

}));//despues de la , defino que es lo que va a hacer despues de autentificarse el usuario
//done p que continue luego del proceso de autentificacion
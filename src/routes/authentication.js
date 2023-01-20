const express = require('express');
const router = express.Router();
const passport = require('passport'); 

//ruta p renderizar el form
router.get('/signup', (req, res) => {
    res.render('auth/signup');
    
});

//ruta p recibir los datos del form
router.post('/signup', (req, res) => {
    //toma el nombre de la autenticacion creada(local.signup)
    passport.authenticate('local.signup', {//a donde quiero que envie cuando todo este bien o este
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });
    //res.send('recibido');
});

//ruta para ir al perfil
router.get('/profile', (req, res) => {
    res.send('Perfil');
});


module.exports = router;
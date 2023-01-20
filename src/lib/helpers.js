const bcrypt = require ('bcryptjs');

const helpers = {} //es un objeto

helpers.encryptPassword = async (password) => { //password es la contraseña que le pasa el usuario en texto plano
    const salt = await bcrypt.genSalt(10);//se ejecuta 10 veces. mientras mas veces se ejecute mas segura sera la contraseña
     //gensalt es p generar un hash(algoritmo matematico p encriptar)
    const hash = await bcrypt.hash(password, salt); //aca empieza a cifrar
    return hash;
};

//al loguearse de nuevo hay q comparar la contraseña con la q se esta logueando con lo cifrado de la db
helpers.matchPassword = async (password, savedPssword) => {
    try {
        await bcrypt.compare(password, savedPssword)
    } catch(e) {
        console.log(e);
    }
};
module.exports = helpers;
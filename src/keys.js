//almacena claves necesarias para utilizar el servicio
//keys tiene la direccion de la db
module.exports = {

    database: { //objeto de config de la db
        connectionLimit: 10,
        host: 'localhost',//donde esta alojada
        user: 'root',//a traves de qué usuario me voy a conectar
        password: '',
        database: 'db_links'
    }

};
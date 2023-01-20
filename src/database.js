//crea la conección a la DB
const mysql = require('mysql');
const { database } = require('./keys'); // con {} traigo solo una propiedad
const { promisify } = require('util');

const pool = mysql.createPool(database);//createpool es una especie de hilos que se van ejecutando una tarea a la vez
//pool es una conexion a la db

pool.getConnection((err, connection) => {//lo ejecuto
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }//PROTOCOL_CONNECTION_LOST: conexion con la db perdida
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections'); 
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});

pool.query = promisify(pool.query); 
//solo necesita los metodos que empiecen con query
//cada vez que quiera hacer una consulta utilizo promesas

module.exports = pool;

//debe utilizar callbacks ya que el modulo no soporta las promesas ni syncawait

//hay un modulo que permite convertir cod callback a cod de primesas
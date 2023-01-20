const express = require ('express');
const router = express.Router();
const pool = require('../database'); //pool hace referencia a la conexion a la db

//AGREGA UN ENLACE

//para cuando el nav trate de hacer una peticion
router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req , res) =>{
    //console.log(req.body);
    const {titulo, url, descripcion} = req.body;//destructuring (de este objeto quiero el tit,url y desc)
    const nuevoLink = { //guardo los datos dentro de un nuevo objeto
        titulo,//propiedades
        url,
        descripcion
    };
    //console.log(nuevoLink);
    await pool.query('INSERT INTO links set ?', [nuevoLink]);//guardo los datos en la db
    req.flash('success', 'Agregado exitosamente');
    //con el ? le digo que le voy a pasar los datos a continuación
    //es una petición asincrona por lo que se usa await para que cuando termine siga con la sig linea
    //para que await funcione, a la función hay que agregarle async
    res.redirect('/links')
})//recive los datos del formulario

//LISTAR LOS ENLACES

router.get('/', async (req, res) => { //seria /links pero todos los links preceden con /links por lo que no hace falta ponerlo
    const links = await pool.query('SELECT * FROM links ');
    console.log(links);
    res.render('links/list', { links });//le pasa los links a esta vista
})

//ELIMINAR UN ENLACE

router.get('/delete/:id', async (req, res) => {
    /*console.log(req.params.id);//compruebo que está enviando el id
    res.send('Eliminado');//si lo envia mando un mje*/
    const {id} = req.params;//id que está pasando el usuario
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);//el ? es el paramentro que se le pasa a continuacion
    req.flash('success', 'Eliminado exitosamente');
    res.redirect('/links'); 
})

//EDITAR UN ENLACE

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;//id que está pasando el usuario
    /*console.log(id);//compruebo que está enviando el id
    res.send('recibido');*/
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);//el ? es el paramentro que se le pasa a continuacion
    //console.log(links[0]);//del arreglo solo quiero el primer objeto
    res.render('links/edit', {link: links[0]}); //te pasa la propiedad links con los valores que traje de la db
})

//ACTUALIZA LOS DATOS QUE SE MODIFICAN

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, url} = req.body; 
    const newLink = {
        titulo,
        descripcion,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Actualizado exitosamente');
    res.redirect('/links');
});


module.exports = router;
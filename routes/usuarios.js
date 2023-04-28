const express = require('express');
const Joi = require('joi');
const ruta = express.Router();

const usuarios = [
    {id:1, nombre: 'Juan'},
    {id:2, nombre: 'Karen'},
    {id:3, nombre: 'Diego'},
    {id:4, nombre: 'Maria'},
];

function existeUsuario(id){
    return (usuarios.find(u => u.id === parseInt(id)));
}

function validarUsuario(nom){
    const schema = Joi.object({
        nombre: Joi.string()
                .min(3)
                .required()
    });
    return (schema.validate({nombre:nom}));
}

ruta.get('/', (req, res) => {
    res.send(usuarios);
});


// Con los : delante del id
// Express sabe que es un parámetro a recibir en la ruta

ruta.get('/:id', (req, res) =>{
    // En el puerto del objeto req está la propiedad
    // params, que guarda los párametros enviados.
    //const array = ['Jorge', 'Ana', 'Karen', 'Luis'];
    //const pos = req.params.id;
    // Los parametros en re.params se reciben como strings
    // parseInt, hace el casteo a valores enteros directamente.
    //const id = parseInt(req.params.id);
    // Devuelve el primer usuario que cumpla con el predicado
    //const usuario = usuarios.find(u => u.id === id);
    const id = req.params.id;
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send(`El usuario ${id} no se encuentra!`);
        return;
    }
    //res.send(req.params.id);
    res.send(usuario);
    //res.send(array[pos]);
    return;
});
// La ruta tiene el mismo nombre que la peticion GET
// Express hace la diferencia dependiendo del tipo
// de petición
// La petición POST la vamos a utilizar para insertar
// un nuevo usuario en nuetro arreglo

ruta.post('/', (req, res) => {
    // El objeto request tiene la propiedad body
    // que va a venir en formato JSON
    // Creación del schema Joi
    
    /*
    const schema = Joi.object({
        nombre: Joi.string()
                   .min(3)
                   .required()
    });
    const {error, value} = schema.validate({nombre: req.body.nombre});
    */
   /*
    let body = req.body;
    console.log(body.nombre);
    res.json({
        body
    });
    */
    
    const {error, value} = validarUsuario(req.body.nombre);
    if(!error){
        const usuario = {
            id: usuarios.length + 1,
            nombre: req.body.nombre
        };
        usuarios.push(usuario);
        res.send(usuario);
    }else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
    

    
    // if(!req.body.nombre || req.body.nombre.length <= 2){
    //     //Código 400: Bad Request
    //     res.status(400).send('Debe ingresar un nombre que tenga al menos 3 letras.');
    //     return; // Es necesario para que no continúe el método
    // }

    // const usuario = {
    //     id: usuarios.length + 1,
    //     nombre: req.body.nombre
    // };
    // usuarios.push(usuario);
    // res.send(usuario);
    return;
});

// Peticion para modificar datoa existentes
    // Este método debe recibir un párametro 
    // id para saber que usuario modificar 
    ruta.put('/:id', (req, res) => {
        // Encontar si existe el usuario a modificar 
        // parseInt. hace el casteo a valores entereros directamente
        //const id = parseInt(req.params.id);
        // Devuelve el primer usuario que cumpla con el predicado
        //const usuario = usuarios.find(u => u.id === id);
        let usuario = existeUsuario(req.params.id);
        if(!usuario){
            res.status(404).send('El usuario no se encuentra'); // Devuelve el estado HTTP
            return;
        }
        // Validar si el dato recibido es correcto
        const {error, value} = validarUsuario(req.body.nombre);
        /*const schema = Joi.object({
            nombre: Joi.string()
                    .min(3)
                    .required()
        });
        const {error, value} = schema.validate({nombre: req.body.nombre});
        */
        
        if(!error){
            // Actualiza el nombre
            usuario.nombre = value.nombre;
            res.send(usuario);
        }
        else{
            const mensaje = error.details[0].message;
            res.status(400).send(mensaje);
        }
        return;
    });

// Recibe como parámetro el id del usuario 
// que se va a eliminar
ruta.delete('/:id', (req, res) => {
    const usuario = existeUsuario(req.params.id);
    if (!usuario){
        res.status(404).send('El usuario no se encuentra'); // Devuelve el estado HTTP
        return;
    }
    // Encontrar el indice del usuario dentro del arreglo
    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1); //Elimina el elemento en el indice 
    res.send(usuario); // Se responde con el usuario eliminado
    return;
});
    
module.exports = ruta; // Se exporta el objeto ruta
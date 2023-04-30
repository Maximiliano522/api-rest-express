const express = require('express');
const Joi = require('joi');
const ruta = express.Router();

// -------------- Arreglos -------------------

const productos = [
    {id:1, nombre: 'Ratón inalámbrico'},
    {id:2, nombre: 'Teclado Mécanico'},
    {id:3, nombre: 'Monitor 24 in'},
    {id:4, nombre: 'Cable HDMI 6 ft'},
];

// -------------- Fuciones GENERALES -------------------

function existeProducto(id){
    return (productos.find(u => u.id === parseInt(id)));
}

function validarProductos(nom){
    const schema = Joi.object({
        nombre: Joi.string()
                .min(3)
                .required()
    });
    return (schema.validate({nombre:nom}));
}

ruta.get('/', (req, res) => {
    res.send(productos);
});

// -------------- Fuciones GET -------------------

ruta.get('/:id', (req, res) =>{

    const id = req.params.id;
    let producto = existeProducto(req.params.id);
    if(!producto){
        res.status(404).send(`El producto ${id} no se encuentra!`);
        return;
    }
    //res.send(req.params.id);
    res.send(producto);
    //res.send(array[pos]);
    return;
});

// -------------- Fuciones POST -------------------

ruta.post('/', (req, res) => {
    
    const {error, value} = validarProductos(req.body.nombre);
    if(!error){
        const producto = {
            id: productos.length + 1,
            nombre: req.body.nombre
        };
        productos.push(producto);
        res.send(producto);
    }else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
    
    return;
});

// -------------- Fuciones PUT -------------------

ruta.put('/:id', (req, res) => {
   
    let producto = existeProducto(req.params.id);
    if(!producto){
        res.status(404).send('El producto no se encuentra'); // Devuelve el estado HTTP
        return;
    }
    // Validar si el dato recibido es correcto
    const {error, value} = validarProductos(req.body.nombre);
    
    if(!error){
        // Actualiza el nombre
        producto.nombre = value.nombre;
        res.send(producto);
    }
    else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
    return;
});

// -------------- Fuciones DELETE -------------------

ruta.delete('/:id', (req, res) => {
const producto = existeProducto(req.params.id);
if (!producto){
    res.status(404).send('El usuario no se encuentra'); // Devuelve el estado HTTP
    return;
}
// Encontrar el indice del usuario dentro del arreglo
const index = productos.indexOf(producto);
productos.splice(index, 1); //Elimina el elemento en el indice 
res.send(producto); // Se responde con el producto eliminado
return;
});

module.exports = ruta; // Se exporta el objeto ruta
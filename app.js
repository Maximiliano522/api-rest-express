const inicioDebug = require('debug')('app:inicio'); // Importar el paquete Debug
                                            // El parametro indica el archivo y el entorno
                                            // de depuración.
const dbDebug = require('debug')('app:db');
const usuarios = require('./routes/usuarios');
const express = require('express'); // Importa el paquete express
const config = require('config'); // Exporrta el paquete config
const logger = require('./logger');
const morgan = require('morgan');
const Joi = require('joi');
const app = express();              // Crea una instancia de express

const joi =require('joi');

// Cuáles son los métodos a implementar
// con su ruta

/*
app.get(); // Consulta
app.post(); // Envío de datos al servidor (insertar sados en la base)
app.put(); // Actualización
app.delete(); // Eliminación
*/

app.use(express.json()); // Le decimos a Express que use este
                       // middleware

app.use(express.static('public')); // Nombre de la carpeta que tendra los archivos
                                   // (recursos estáticos)

app.use('/api/usuarios', usuarios); // Middleware que importamos
// El primer parámetro es la ruta raíz asociada con las peticiones a los
// datos de usuario. La ruta raíz se va a concatenar como prefijo
// al inicio de todas las rutas definidas en el archivo usuarios.
app.use(express.urlencoded({extended:true})); // Nuevo Middleware
                                              // Define el uso de la libreria qa para
                                              // separar la información codificada en
                                              // el url.

console.log(`Aplicación: ${config.get('nombre')}`);       
console.log(`BD server: ${config.get(`configDB.host`)}`);     

if(app.get('env') === 'development'){
    //app.use(morgan('tiny'));
    //console.log('Morgan habilitado...');
    // Muestra el mensaje de depuración
    inicioDebug('Morgan esta habilitado...');
}

dbDebug('Conectado con la base de datos...');



/*
app.use(logger); // logger ya hacé referencia a la funcion log de logger.js
                 // debido al exports

app.use(function(req, res, next){
    console.log('Autenticando...');
    next();
});
*/

// Los tres app.use() son middleware y se llaman antes de 
// las funciones de ruta GET, POST, PUT, DELETE
// para que estas puedan trabajar.



// Consulta en la raíz del sitio
// Toda peticion siempre va a recibir dos parámetros
// req: La infromacón que recibe el servidor desde el cliente
// res: La información que el servidor va a responder al cliente
// Vamos a utilizar ek método send del objeto res

app.get('/', (req, res) => {
    res.send('¡Hola mundo desde Express!');
});




// Recibiendo varios parámetros
// Se pasan dos parámetros year y month
// Query string
// localhost:5000/1990/2/?nombrexxxx&single=y

/*
app.get('/api/usuarios/:year/:month', (req, res) => {
    // En el cuerpo de req está la propiedad
    // query, que guarda los parámetros Query String.
    res.send(req.query); //params
});
*/


app.get('/api/productos', (req, res) => {
    res.send(['mouse', 'teclado', 'bocinas']);
});

// El módulo process, contiene información del sistema
// El objeto env contiene información de las variables 
// de entorno.
// Si la variable PORT no existe, que tome un valor
// fijo definido por nosotros (3000)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}...`);
});

// ------------ Funciones middleware ------------------
// El middleware es un bloque de codigo que se ejecuta
// entre las peticiones del usuario(request) y la peticion 
// que llega al servidor. Es un enlace entre la peticion
// del usuario y el servidor, antes de que este pueda
// dar una respuesta.

// Las funciones de middleware son funciones que tienen acceso
// al objeto de solicitud (req), al objeto de respuesta (res)
// y a la siguiente funcion de middleware en el ciclo de 
// solicitud/respuestas de la aplicacion. La siguiente
// funcion de middleware se denota normalmente con una 
// variable denominada asi next.

// Las funciones de middleware pueden realizar las siguientes 
// tareas: 

// - Ejecutar cualquier codigo.
// - Realizar cambios en la solicitud y los objetos de respuesta
// - Finalizar el ciclo de solicitud/respuesta 
// - Invoca la siguiente funcion de middlaware en la pila

// Express es un framework de direccionamiento y uso de middleware
// que permite que la aplicacion tenga funcionalidad minima propia.

// Ya hemos utilizado algunos middleware como son express.json()
// que transforma el body del req a formato JSON

//            ----------------------
// request --|--> json --> rpute() --|--> response
//            -----------------------

// request() --> Funcion GET, POST, PUT, DELETE

// Una aplicacion Express puede utilizar los siguientes tipos
// de middleware
//      - Middleware de nivel de aplicacion
//      - Middleware de nivel de direccionador
//      - Middleware de manejo de errores
//      - Middleware incorporado
//      - Midleware de terceros

// ----------------- Recursos estáticos -------------------

// Los recuros estaticos hacen referencia a archivos,
// imagenes, documentos que se ubican en el servidor
// vamos a usar un middleware para poder acceder a esos
// recursos.



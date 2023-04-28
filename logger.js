function log(req, res, next){
    console.log('Logging...');
    next(); // Le indica a express que llame la siguiente función middlware
            // o la peticion correspondiente
            // Si no lo indicamos, Express se queda dentro de esta función
};

module.exports = log;
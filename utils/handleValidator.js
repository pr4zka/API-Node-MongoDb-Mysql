const { validationResult } = require("express-validator");

const validationResults = (req, res, next) => {
  try {
    validationResult(req).throw(); //Valida todo lo que se envia en la peticion 
     return next(); //Si no hay un error continua hacia el controlador
  } catch (err) {
    res.status(403);   // Devolver un error
    res.send({ errors: err.array() }); // Mandar un array con los errores
  }
};

module.exports = validationResults;
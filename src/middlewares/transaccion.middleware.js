const { validarValor } = require("../validators/valor.validator");

function validarTransaccion(req, res, next) {
    try {
        validarValor(req.body.valor);
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = validarTransaccion;

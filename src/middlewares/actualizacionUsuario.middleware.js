const {
  validarNombre,
  validarEmail,
  validarTipoCuenta,
} = require("../validators/usuario.validator");

function validarActualizacionUsuario(req, res, next) {
  try {
    const { nombre, email, tipoCuenta } = req.body;
    if (nombre !== undefined) {
      validarNombre(nombre);
    }
    if (email !== undefined) {
      validarEmail(email);
    }
    if (tipoCuenta !== undefined) {
      validarTipoCuenta(tipoCuenta);
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = validarActualizacionUsuario;

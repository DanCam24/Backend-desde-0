const AppError = require("../errors/AppError");
const {
  validarNombre,
  validarEmail,
  validarTipoCuenta,
} = require("../validators/usuario.validator");

function validarUsuario(req, res, next) {
  try {
    const { nombre, email, tipoCuenta } = req.body;
    if (!nombre || !email) {
      throw new AppError(400, "Los campos nombre y email son obligatorios");
    }
    validarNombre(nombre);
    validarEmail(email);
    if (tipoCuenta !== undefined) {
      validarTipoCuenta(tipoCuenta);
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = validarUsuario;

const AppError = require("../errors/AppError");
const {
  validarNombre,
  validarEmail,
  validarTipoCuenta,
} = require("../validators/usuario.validator");

function validarUsuario(req, res, next) {
  try {
    const { id, nombre, email, tipoCuenta } = req.body;
    if (id === undefined || nombre === undefined || email === undefined) {
      throw new AppError(400, "Los campos id, nombre y email son obligatorios");
    }
    if (!Number.isInteger(id)) {
      throw new AppError(400, "El ID debe ser un número entero", {
        campo: "id",
      });
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

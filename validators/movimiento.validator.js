const AppError = require("../errors/AppError");

function validarTipoMovimiento(tipo) {
  const tiposPermitidos = [
    "CONSIGNACION",
    "RETIRO",
  ];

  if (!tiposPermitidos.includes(tipo)) {
    throw new AppError(422, "Tipo de movimiento inválido", {
      campo: "tipo",
      permitidos: tiposPermitidos,
    });
  }
}


module.exports = {
  validarTipoMovimiento,
};
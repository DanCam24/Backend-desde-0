const movimientosService = require("../services/movimientos.service");

function obtenerMovimientosUsuario(req, res, next) {
  try {
    const { id } = req.params;
    const movimientos = movimientosService.obtenerMovimientosUsuario(id);
    res.status(200).json(movimientos);
  } catch (error) {
    next(error);
  }
}

function obtenerTodos(req, res, next) {
  try {
    const movimientos = movimientosService.obtenerTodos();
    res.status(200).json(movimientos);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerMovimientosUsuario,
  obtenerTodos,
};

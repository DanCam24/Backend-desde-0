const movimientosService = require("../services/movimientos.service");

async function obtenerMovimientosUsuario(req, res, next) {
  try {
    const { id } = req.params;
    const movimientos = await movimientosService.obtenerMovimientosUsuario(id);
    res.status(200).json(movimientos);
  } catch (error) {
    next(error);
  }
}

async function obtenerTodos(req, res, next) {
  try {
    const movimientos = await movimientosService.obtenerTodos();
    res.status(200).json(movimientos);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerMovimientosUsuario,
  obtenerTodos,
};

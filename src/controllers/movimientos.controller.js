const movimientosService = require("../services/movimiento.service");

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
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const movimientos = await movimientosService.obtenerTodos(
      Number(limit),
      Number(offset)
    );
    res.status(200).json({
      pagina: Number(page),
      limite: Number(limit),
      movimientos,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerMovimientosUsuario,
  obtenerTodos,
};

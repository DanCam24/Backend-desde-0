const pool = require("../database/connection");

async function obtenerTodos(limit, offset) {
  const result = await pool.query(
    `
    SELECT *
    FROM movimientos
    ORDER BY fecha DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );
  return result.rows;
}

async function crear(movimiento, client = pool) {
  const result = await client.query(
    `
    INSERT INTO movimientos
    (usuario_id,tipo,valor)
    VALUES($1,$2,$3)
    RETURNING *
    `,
    [movimiento.usuarioId, movimiento.tipo, movimiento.valor]
  );
  return result.rows[0];
}

async function obtenerMovimientosUsuario(usuarioId) {
  const result = await pool.query(
    `
    SELECT *
    FROM movimientos
    WHERE usuario_id = $1
    ORDER BY fecha DESC
    `,
    [usuarioId]
  );
  return result.rows;
}

module.exports = {
  obtenerTodos,
  crear,
  obtenerMovimientosUsuario,
};

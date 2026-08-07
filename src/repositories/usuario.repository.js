const pool = require("../database/connection");

async function obtenerTodos(limit, offset) {
  const result = await pool.query(
    `
    SELECT *
    FROM usuarios
    WHERE activo=true
    ORDER BY id
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );
  return result.rows;
}

async function obtenerPorId(id) {
  const result = await pool.query(
    `
    SELECT *
    FROM usuarios
    WHERE id=$1
    AND activo=true
    `,
    [id]
  );
  return result.rows[0];
}

async function crear(usuario) {
  const result = await pool.query(
    `
    INSERT INTO usuarios
    (
      nombre,
      email,
      tipo_cuenta
    )
    VALUES
    ($1,$2,$3)
    RETURNING *
    `,
    [usuario.nombre, usuario.email, usuario.tipoCuenta]
  );
  return result.rows[0];
}

async function actualizar(id, datos) {
  const result = await pool.query(
    `
    UPDATE usuarios
    SET
      nombre = COALESCE($1,nombre),
      email = COALESCE($2,email),
      tipo_cuenta = COALESCE($3,tipo_cuenta)
    WHERE id=$4
    RETURNING *
    `,
    [datos.nombre, datos.email, datos.tipoCuenta, id]
  );
  return result.rows[0];
}

async function eliminar(id) {
  const result = await pool.query(
    `
    UPDATE usuarios
    SET activo=false
    WHERE id=$1
    RETURNING *
    `,
    [id]
  );
  return result.rows[0];
}

async function obtenerPorIdConBloqueo(id, client) {
  const result = await client.query(
    `
    SELECT *
    FROM usuarios
    WHERE id=$1
    FOR UPDATE
    `,
    [id]
  );
  return result.rows[0];
}

async function actualizarSaldo(id, saldo, client = pool) {
  const result = await client.query(
    `
    UPDATE usuarios
    SET saldo=$1
    WHERE id=$2
    RETURNING *
    `,
    [saldo, id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerPorIdConBloqueo,
  crear,
  actualizar,
  actualizarSaldo,
  eliminar,
};

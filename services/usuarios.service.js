const usuariosRepository = require("../repositories/usuarios.repository");
const AppError = require("../errors/AppError");
const movimientosRepository = require("../repositories/movimientos.repository");
const { executeTransaction } = require("../database/transaction");

async function obtenerTodos() {
  return await usuariosRepository.obtenerTodos();
}

async function obtenerPorId(id) {
  const usuario = await usuariosRepository.obtenerPorId(id);
  if (!usuario) {
    throw new AppError(404, "Usuario no encontrado", {
      id,
    });
  }
  return usuario;
}

async function crear(usuario) {
  const usuarioCreado = await usuariosRepository.crear(usuario);
  return usuarioCreado;
}

async function actualizar(id, datosNuevos) {
  await obtenerPorId(id);
  return await usuariosRepository.actualizar(id, datosNuevos);
}

async function eliminar(id) {
  const eliminado = await usuariosRepository.eliminar(id);
  if (!eliminado) {
    throw new AppError(404, "Usuario no encontrado", {
      id,
    });
  }
  return eliminado;
}

async function consultarSaldo(id) {
  const usuario = await obtenerPorId(id);

  return usuario.saldo;
}

// TEMPORAL
// Luego estos dos métodos los pasaremos a transacciones ACID
async function consignar(id, valor) {
  return executeTransaction(async (client) => {
    const usuario = await usuariosRepository.obtenerPorIdConBloqueo(id, client);
    if (!usuario) {
      throw new AppError(404, "Usuario no encontrado");
    }
    const nuevoSaldo = Number(usuario.saldo) + valor;
    await usuariosRepository.actualizarSaldo(id, nuevoSaldo, client);
    await movimientosRepository.crear(
      {
        usuarioId: id,
        tipo: "CONSIGNACION",
        valor,
      },
      client
    );
    return {
      saldo: nuevoSaldo,
    };
  });
}

async function retirar(id, valor) {

  return executeTransaction(async (client) => {

    const usuario =
      await usuariosRepository.obtenerPorIdConBloqueo(id, client);


    if (!usuario) {
      throw new AppError(404, "Usuario no encontrado", {
        id,
      });
    }


    if (Number(usuario.saldo) < valor) {
      throw new AppError(422, "Saldo insuficiente", {
        saldoDisponible: usuario.saldo,
        valorSolicitado: valor,
      });
    }


    const nuevoSaldo =
      Number(usuario.saldo) - valor;


    await usuariosRepository.actualizarSaldo(
      id,
      nuevoSaldo,
      client
    );


    await movimientosRepository.crear(
      {
        usuarioId: id,
        tipo: "RETIRO",
        valor,
      },
      client
    );


    return {
      saldo: nuevoSaldo,
    };

  });

}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  consultarSaldo,
  consignar,
  retirar,
};

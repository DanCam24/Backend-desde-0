const {
  crearUsuarioDTO,
  actualizarUsuarioDTO,
} = require("../dtos/usuario.dto");
const usuariosService = require("../services/usuarios.service");

async function obtenerUsuarios(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const usuarios = await usuariosService.obtenerTodos(
      Number(limit),
      Number(offset)
    );
    res.status(200).json({
      pagina: Number(page),
      limite: Number(limit),
      usuarios,
    });
  } catch (error) {
    next(error);
  }
}

async function obtenerUsuarioPorId(req, res, next) {
  try {
    const { id } = req.params;
    const usuario = await usuariosService.obtenerPorId(id);
    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
}

async function crearUsuario(req, res, next) {
  try {
    const datosUsuario = crearUsuarioDTO(req.body);
    const usuarioCreado = await usuariosService.crear(datosUsuario);
    res.status(201).json({
      mensaje: "Usuario creado",
      usuario: usuarioCreado,
    });
  } catch (error) {
    next(error);
  }
}

async function actualizarUsuario(req, res, next) {
  try {
    const { id } = req.params;
    const datosNuevos = actualizarUsuarioDTO(req.body);
    const usuarioActualizado = await usuariosService.actualizar(
      id,
      datosNuevos
    );
    res.status(200).json({
      mensaje: "Usuario actualizado",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    next(error);
  }
}

async function eliminarUsuario(req, res, next) {
  try {
    const { id } = req.params;
    await usuariosService.eliminar(id);
    res.status(200).json({
      mensaje: "Usuario desactivado correctamente",
    });
  } catch (error) {
    next(error);
  }
}

async function consultarSaldo(req, res, next) {
  try {
    const { id } = req.params;
    const saldo = await usuariosService.consultarSaldo(id);
    res.status(200).json({
      saldo,
    });
  } catch (error) {
    next(error);
  }
}

async function consignar(req, res, next) {
  try {
    const { id } = req.params;
    const { valor } = req.body;
    const resultado = await usuariosService.consignar(id, valor);
    res.status(200).json({
      mensaje: "Consignación realizada",
      saldo: resultado.saldo,
    });
  } catch (error) {
    next(error);
  }
}

async function retirar(req, res, next) {
  try {
    const { id } = req.params;
    const { valor } = req.body;
    const resultado = await usuariosService.retirar(id, valor);
    res.status(200).json({
      mensaje: "Retiro realizado",
      saldo: resultado.saldo,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  consultarSaldo,
  consignar,
  retirar,
};

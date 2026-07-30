const {
  crearUsuarioDTO,
  actualizarUsuarioDTO,
} = require("../dtos/usuario.dto");
const usuariosService = require("../services/usuarios.service");

function obtenerUsuarios(req, res, next) {
  try {
    const usuarios = usuariosService.obtenerTodos();
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
}

function obtenerUsuarioPorId(req, res, next) {
  try {
    const { id } = req.params;
    const usuario = usuariosService.obtenerPorId(id);
    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
}

function crearUsuario(req, res, next) {
  try {
    const datosUsuario = crearUsuarioDTO(req.body);
    const usuarioCreado = usuariosService.crear(datosUsuario);
    res.status(201).json({
      mensaje: "Usuario creado",
      usuario: usuarioCreado,
    });
  } catch (error) {
    next(error);
  }
}

function actualizarUsuario(req, res, next) {
  try {
    const { id } = req.params;
    const datosNuevos = actualizarUsuarioDTO(req.body);
    const usuarioActualizado = usuariosService.actualizar(id, datosNuevos);
    res.status(200).json({
      mensaje: "Usuario actualizado",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    next(error);
  }
}

function eliminarUsuario(req, res, next) {
  try {
    const { id } = req.params;
    usuariosService.eliminar(id);
    res.status(200).json({
      mensaje: "Usuario eliminado",
    });
  } catch (error) {
    next(error);
  }
}

function consultarSaldo(req, res, next) {
  try {
    const { id } = req.params;
    const saldo = usuariosService.consultarSaldo(id);
    res.status(200).json({
      saldo,
    });
  } catch (error) {
    next(error);
  }
}

function consignar(req, res, next) {
  try {
    const { id } = req.params;
    const { valor } = req.body;
    const usuario = usuariosService.consignar(id, valor);
    res.status(200).json({
      mensaje: "Consignación realizada",
      saldo: usuario.saldo,
    });
  } catch (error) {
    next(error);
  }
}

function retirar(req, res, next) {
  try {
    const { id } = req.params;
    const { valor } = req.body;
    const usuario = usuariosService.retirar(id, valor);
    res.status(200).json({
      mensaje: "Retiro realizado",
      saldo: usuario.saldo,
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

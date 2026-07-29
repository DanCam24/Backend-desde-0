const usuarios = require("../data/usuarios");
const {
  crearUsuarioDTO,
  actualizarUsuarioDTO,
} = require("../dtos/usuario.dto");
const AppError = require("../errors/AppError");

function obtenerUsuarioPorId(req, res, next) {
  const { id } = req.params;
  const usuario = usuarios.find((usuario) => usuario.id == id);
  if (!usuario) {
    return next(
      new AppError(404, "Usuario no encontrado", {
        id,
      })
    );
  }
  res.status(200).json(usuario);
}

function obtenerUsuarios(req, res, next) {
  try {
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
}

function crearUsuario(req, res, next) {
  try {
    const nuevoUsuario = crearUsuarioDTO(req.body);
    const existe = usuarios.some((usuario) => usuario.id === nuevoUsuario.id);
    if (existe) {
      return next(
        new AppError(409, "El ID ya existe", {
          id: nuevoUsuario.id,
        })
      );
    }
    usuarios.push(nuevoUsuario);
    res.status(201).json({
      mensaje: "Usuario creado",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    next(error);
  }
}

function actualizarUsuario(req, res, next) {
  const { id } = req.params;
  const datosNuevos = actualizarUsuarioDTO(req.body);
  const usuario = usuarios.find((usuario) => usuario.id == id);
  if (!usuario) {
    return next(
      new AppError(404, "Usuario no encontrado", {
        id,
      })
    );
  }
  if (datosNuevos.nombre) {
    usuario.nombre = datosNuevos.nombre;
  }
  if (datosNuevos.email) {
    usuario.email = datosNuevos.email;
  }
  res.json({
    mensaje: "Usuario actualizado",
    usuario,
  });
}

function eliminarUsuario(req, res, next) {
  const { id } = req.params;
  const indice = usuarios.findIndex((usuario) => usuario.id == id);
  if (indice === -1) {
    return next(
      new AppError(404, "Usuario no encontrado", {
        id,
      })
    );
  }
  usuarios.splice(indice, 1);
  res.json({
    mensaje: "Usuario eliminado",
  });
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};

const express = require("express");
const router = express.Router();
const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controller");
const validarUsuario = require("../middlewares/validarUsuario");
const auth = require("../middlewares/auth");

router.get("/", auth, obtenerUsuarios);

router.get("/:id", obtenerUsuarioPorId);

router.post("/", auth, validarUsuario, crearUsuario);

router.put("/:id", actualizarUsuario);

router.delete("/:id", eliminarUsuario);

module.exports = router;

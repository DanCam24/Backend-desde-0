const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  obtenerMovimientosUsuario,
  obtenerTodos,
} = require("../controllers/movimientos.controller");

router.get("/", auth, obtenerTodos);

router.get("/usuario/:id", auth, obtenerMovimientosUsuario);

module.exports = router;

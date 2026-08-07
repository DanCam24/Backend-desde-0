const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const validarId = require("../middlewares/id.middleware");
const {
  obtenerMovimientosUsuario,
  obtenerTodos,
} = require("../controllers/movimientos.controller");

router.get("/", auth, obtenerTodos);
router.get("/usuario/:id", auth, validarId, obtenerMovimientosUsuario);

module.exports = router;

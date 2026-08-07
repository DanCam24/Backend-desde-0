CREATE INDEX idx_movimientos_usuario_id
ON movimientos(usuario_id);

CREATE INDEX idx_movimientos_fecha
ON movimientos(fecha DESC);

CREATE INDEX idx_usuarios_activo
ON usuarios(activo);

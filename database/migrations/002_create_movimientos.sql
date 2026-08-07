CREATE TABLE movimientos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    valor NUMERIC(12,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tipo_movimiento_valido
    CHECK(tipo IN(
        'CONSIGNACION',
        'RETIRO'
    )),
    CONSTRAINT valor_positivo
    CHECK(valor > 0),
    CONSTRAINT fk_usuario_movimiento
    FOREIGN KEY(usuario_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
);

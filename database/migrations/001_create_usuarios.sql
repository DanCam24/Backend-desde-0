CREATE TABLE usuarios (

    id SERIAL PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    tipo_cuenta VARCHAR(20) NOT NULL,

    saldo NUMERIC(12,2) NOT NULL DEFAULT 0,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT saldo_no_negativo
    CHECK(saldo >= 0),

    CONSTRAINT tipo_cuenta_valida
    CHECK(tipo_cuenta IN(
        'AHORROS',
        'CORRIENTE'
    ))
);
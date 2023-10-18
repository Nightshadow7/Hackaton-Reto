import Joi from "joi";

const id = Joi.string().hex().length(24);
const nombre = Joi.string().min(7).max(20);
const correo = Joi.string().email();
const password = Joi.string().alphanum();
const tipoDocumento = Joi.string().default("Cedula de Ciudadania")
const numeroDocumento = Joi.number().min(1000000).max(999999999999)
const cuentasAhorro = Joi.array().items({
  numeroCuenta: Joi.number(),
  saldo: Joi.number(),
});
const movimientos = Joi.array().items({
  fecha: Joi.date(),
  monto: Joi.number().min(1000),
  check: Joi.boolean()
})
const qrs = Joi.array().items({
  plantilla: Joi.string().hex().length(24),
  nombre: Joi.string().min(7).max(20),
  cuentaDestino: Joi.number().min(10000000000).max(99999999999),
  estado: Joi.boolean().default(true),
});
const imagen = Joi.array()
const estado = Joi.boolean().default(true);

export const getUsuarioSchema = Joi.object({
  id: id.required()
});

export const createUsuarioSchema = Joi.object({
  id,
  nombre: nombre.required(),
  correo: correo.required(),
  password: password.required(),
  tipoDocumento: tipoDocumento.required(),
  numeroDocumento: numeroDocumento.required(),
  estado
});

export const updateUsuarioSchema = Joi.object({
  nombre,
  correo,
  password,
  tipoDocumento,
  numeroDocumento,
  estado
});

export const createCuentaAhorroSchema = Joi.object({
  cuentasAhorro,
});

export const createMovimientosSchema = Joi.object({
  movimientos,
});

export const createQRSchema = Joi.object({
  qrs
});

export const createQRImageSchema = Joi.object({
  imagen,
})
import Joi from "joi";

const id = Joi.string().hex().length(24);
const nombre = Joi.string().min(7).max(20);
const correo = Joi.string().email();
const password = Joi.string().password().alphanum();
const tipoDocumento = Joi.string().default("Cedula de Ciudadania")
const numeroDocumento = Joi.number().min(7).max(12).unique()
const cuentasAhorro = Joi.array().items({
  numeroCuenta: Joi.number(),
  saldo: Joi.number().default(200000),
});
const movimientos = Joi.array().items({
  fecha: Joi.date(),
  monto: Joi.number().min(1000),
  check: Joi.boolean()
})
const estado = Joi.boolean().default(true);

export const getUsuarioSchema = Joi.object({
  id: id.required()
})

export const createUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  correo: correo.required(),
  password: password.required(),
  tipoDocumento: tipoDocumento.required(),
  numeroDocumento: numeroDocumento.required(),
  estado
});

export const createCuentaAhorroSchema = Joi.object({
  cuentasAhorro
});

export const createMovimientosSchema = Joi.object({
  movimientos
});

export const updateAreaSchema = Joi.object({
  nombre,
  estado
});
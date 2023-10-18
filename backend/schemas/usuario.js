import Joi from "joi";

const id = Joi.string().hex().length(24);
const nombre = Joi.string().min(7).max(20);
const correo = Joi.string().email();
const password = Joi.string().password().alphanum();
const tipoDocumento = Joi.string().default("Cedula de Ciudadania")
const numeroDocumento = Joi.number().min(7).max(12)
const cuentasAhorro = Joi.array().items({
  numeroCuenta: Joi.number().min(11).max(11),
  saldo: Joi.number().default(200000),
  movimientos: Joi.array().items({
    fecha: Joi.date(),
    monto: Joi.number().min(1000),
    check: Joi.boolean()
  })
});
const estado = Joi.boolean().default(true);

// export const getAreaSchema = Joi.object({
//   id: id.required()
// })

// export const createAreaSchema = Joi.object({
//   id,
//   nombre: nombre.required(),
//   estado
// });

// export const updateAreaSchema = Joi.object({
//   nombre,
//   estado
// });
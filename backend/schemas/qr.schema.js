const id = Joi.string().hex().length(24);
const plantilla = Joi.string().hex().length(24);
const nombre = Joi.string().min(7).max(20);
const usuario = Joi.string().hex().length(24)
const cuentaDestino = Joi.number().min(10000000000).max(99999999999);
const imagen = Joi.string();
const estado = Joi.boolean().default(true);

export const getQrSchema = Joi.object({
  id: id.required()
});

export const createQrSchema = Joi.object({
  id,
  plantilla: plantilla.required(),
  nombre: nombre.required(),
  usuario: usuario.required(),
  cuentaDestino: cuentaDestino.required(),
  estado,
});


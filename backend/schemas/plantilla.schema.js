import Joi from "joi";

const id = Joi.string().hex().length(24);
const nombre = Joi.string().min(7).max(20);
const precio = Joi.number();
const estado = Joi.boolean().default(true);

export const getPlantillaSchema = Joi.object({
  id: id.required()
})

export const createPlantillaSchema = Joi.object({
  nombre: nombre.required(),
  precio: precio.required(),
  estado
});
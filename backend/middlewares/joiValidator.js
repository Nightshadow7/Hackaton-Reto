import boom from "@hapi/boom";

// Validación dinámica dentro de las rutas
export const joiValidator = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    error ? next(boom.badRequest(error)) : next();
  };
};
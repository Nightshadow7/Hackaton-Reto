import jwt from "jsonwebtoken";
import boom from "@hapi/boom";
import Usuario from "../models/Usuarios.js";
import { response, request } from "express";

const verifyToken = async (req = request, res = response, next) => {
  try {
    const { token } = req.body;
    if (!token) throw boom.forbidden("Falta token en la petición");

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await Usuario.findOne({ _id: decoded.id });

    if (!user) throw boom.illegal("Token adulterado");
    if (user.estado == false) throw boom.forbidden("Usuario inactivo");

    res.status(200).json({estado: user.estado, rol: user.rol == "ENTIDAD" ? 1 : 0});
  } catch (err) {
    next(err);
  }
};

export default verifyToken;

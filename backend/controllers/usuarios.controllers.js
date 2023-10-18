import boom from "@hapi/boom";
import Usuario from "../models/Usuarios.js";
import { db } from "../config/mongoClient.js";
import { ObjectId } from "mongodb";
const usuarios = db.collection("usuarios");
import generateRandomNumber from "../middlewares/saldoValidator.js";

export const getAll = async (req, res, next) => {
  try {
    const data = await usuarios.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const oid = req.params.id;
    const User = await Usuario.findById({ _id: oid });
    if (!User)
      throw boom.notFound("Usuario ID no encontrado en la base de datos");
    res.status(200).json(User);
  } catch (err) {
    next(err);
  }
};

export const createUsuario = async (req, res, next) => {
  try {
    const { password, numeroDocumento, correo, ...remaining } = req.body;
    const [UsuarioDB, correoDB] = await Promise.all([
      Usuario.findOne({ numeroDocumento }),
      Usuario.findOne({ correo }),
    ]);
    if (UsuarioDB || correoDB) {
      throw boom.badRequest(
        "El Documento ó el correo electronico ya poseen una cuenta asociada "
      );
    }
    const newUser = new Usuario({
      password: Usuario.encryptPassword(password),
      numeroDocumento,
      correo,
      ...remaining,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const createCuentaAhorros = async (req, res, next) => {
  try {
    const oid = req.params.id;
    const User = await Usuario.findById({ _id: oid });
    if (!User)
      throw boom.notFound("Usuario ID no encontrado en la base de datos");
    if (!User.estado) {
      throw boom.badRequest("El Usuario se encuentra Bloqueado ");
    }
    const data = req.body.cuentasAhorro || [];
    const createdAccounts = [];
    for (const account of data) {
      const number = generateRandomNumber();
      const saldo = account.saldo < 1 ? 200000 : account.saldo;
      const newAccount = {
        numeroCuenta: number,
        saldo,
      };
      User.cuentasAhorro.push(newAccount);
      createdAccounts.push(newAccount);
    }
    await User.save();
    res.status(200).json(createdAccounts);
  } catch (err) {
    next(err);
  }
};

export const createQR = async (req, res, next) => {
  try {
    const oid = req.params.id;
    const User = await Usuario.findById({ _id: oid });
    if (!User)
      throw boom.notFound("Usuario ID no encontrado en la base de datos");
    if (!User.estado) {
      throw boom.badRequest("El Usuario se encuentra Bloqueado ");
    }
  } catch (error) {
    next(error);
  }
};

export const updateUsuario = async (req, res, next) => {
  try {
    const oid = req.params.id;
    const existeUser = await usuarios.findOne({ _id: oid });
    if (!existeUser)
      throw boom.notFound("Usuario ID no encontrado en la base de datos");

    const { password, numeroDocumento, correo, ...remaining } = req.body;
    const [UsuarioDB, correoDB] = await Promise.all([
      Usuario.findOne({ numeroDocumento }),
      Usuario.findOne({ correo }),
    ]);
    if (UsuarioDB || correoDB) {
      throw boom.badRequest(
        "El Documento ó el correo electronico ya poseen una cuenta asociada "
      );
    }
    if (password) {
      let newPassword = Usuario.encryptPassword(password);
      remaining["password"] = newPassword;
    }
    const updateUser = new Usuario({
      numeroDocumento,
      correo,
      ...remaining,
    });
    const updated = await Usuario.findOneAndUpdate(
      { _id: req.params.id },
      updateUser,
      { new: true }
    );
    res.status(200).json({ message: "Usuario actualizado con éxito", updated });
  } catch (err) {
    next(err);
  }
};

export const deleteUsuario = async (req, res, next) => {
  try {
    const deleted = await Usuario.findOneAndUpdate(
      { _id: req.params.id },
      { estado: false },
      { new: true }
    );
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};

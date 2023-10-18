import Usuario from "../models/Usuarios.js";
import { db } from "../config/mongoClient.js";
const usuarios = db.collection("usuarios");

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
    const data = await usuarios.find({_id:req.params.id}).toArray();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

export const createUsuario = async (req, res, next) => {
  try {
    const { password, ...remaining } = req.body;
    const newUser = new Usuario({
      password: Usuario.encryptPassword(password),
      ...remaining,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const updateUsuario = async (req, res, next) => {
  try {
    const updated = await Usuario.findOneAndUpdate(
      {_id:req.params.id},
      req.body,
      {new: true}
    );
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUsuario = async (req, res, next) => {
  try {
    const deleted = await Usuario.findOneAndUpdate(
      {_id:req.params.id},
      {estado: false},
      {new: true}
    );
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};
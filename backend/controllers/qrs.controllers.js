import boom from "@hapi/boom";
import imagenDefault from "../middlewares/imagenDefault.js";
import { db } from "../config/mongoClient.js";
import qrcode from "qrcode";
import qr from "qr-image";
import Jimp from "jimp";
import multer from "multer";
import Qr from "./../models/qr.js";
import Usuarios from "../models/Usuarios.js";
import Form from "./../models/form.js";
import fs from "fs";

const qrs = db.collection("qrs");

export const getAll = async (req, res, next) => {
  try {
    const data = await qrs.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const oid = req.params.id;
    const QrData = await Qr.findById({ _id: oid }).populate('plantilla usuario');
    if (!QrData) throw boom.notFound("Qr ID no encontrado en la base de datos");
    res.status(200).json(QrData);
  } catch (err) {
    next(err);
  }
};

export const findQRByUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const qrs = await Qr.find({ usuario: userId });
    res.status(200).json(qrs);
  } catch (err) {
    next(err);
  }
};

export const createQr = async (req, res, next) => {
  try {
    const { plantilla, usuario, cuentaDestino, ...remaining } = req.body;
    const [plantillaDB, usuarioDB] = await Promise.all([
      Form.findOne({ _id: plantilla }),
      Usuarios.findOne({ _id: usuario }),
    ]);
    if (!plantillaDB || !usuarioDB) {
      throw boom.badRequest(
        "La plantilla ó el usuario no se encuentra registradas en la DB"
      );
    }
    const cuentaExiste = usuarioDB.cuentasAhorro.some(
      (cuenta) => cuenta.numeroCuenta === cuentaDestino
    );
    if (!cuentaExiste) {
      throw boom.badRequest("La cuenta de destino no existe para este usuario");
    }
    const datos = {
      nombre: plantillaDB.nombre,
      campos: plantillaDB.campos,
    };

    const newQr = new Qr({
      plantilla,
      usuario,
      cuentaDestino,
      ...remaining,
    });
    await newQr.save();
    const nuevoId = newQr._id.toString();

    const QrUrl = `http://localhost:3000/pagos/${nuevoId}`;
    const qrCode = await qrcode.toDataURL(QrUrl);

    const actualizadoQr = await Qr.findOneAndUpdate(
      { _id: nuevoId },
      {
        imagen: qrCode,
      },
      { new: true }
    );

    usuarioDB.qrs.push(newQr._id);
    await usuarioDB.save();

    res.status(200).json({ data: newQr });
  } catch (err) {
    next(err);
  }
};

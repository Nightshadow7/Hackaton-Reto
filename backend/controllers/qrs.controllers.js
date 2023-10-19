import boom from "@hapi/boom";
import imagenDefault from "../middlewares/imagenDefault.js";
import QRCode from "qrcode";
import qr from "qr-image";
import Jimp from "jimp";
import multer from "multer";
import Qr from "./../models/qr.js";
import Usuarios from "../models/Usuarios.js";
import Form from "./../models/form.js"
import { db } from "../config/mongoClient.js";

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
  };
};

export const findQRByUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const qrs = await Qr.find({usuario: userId});
    res.status(200).json(qrs);
  } catch (err) {
    next(err);
  }
}

export const createQr = async (req, res, next) => {
  try {
    const { plantilla , usuario, cuentaDestino, ...remaining } = req.body;
    const [plantillaDB, usuarioDB] = await Promise.all([
      Form.findOne({ plantilla }),
      Usuarios.findOne({ usuario }),
    ]);
    if (plantillaDB || usuarioDB) {
      throw boom.badRequest(
        "La plantilla ó el usuario ya poseen una cuenta asociada "
      );
    }
    console.log(usuarioDB);
    const newQr = new Qr({
      ...remaining,
    });
    await newQr.save();
    res.status(200).json(newQr);
  } catch (err) {
    next(err);
  }
};
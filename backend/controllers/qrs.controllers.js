import boom from "@hapi/boom";
import imagenDefault from "../middlewares/imagenDefault.js";
import { db } from "../config/mongoClient.js";
import qrcode from "qrcode";
import qr from "qr-image";
import Jimp from "jimp";
import multer from "multer";
import Qr from "./../models/qr.js";
import Usuarios from "../models/Usuarios.js";
import Form from "./../models/form.js"
import fs from 'fs'


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
    const QrData = await Qr.findById({ _id: oid });
    if (!QrData) throw boom.notFound("Qr ID no encontrado en la base de datos");
    res.status(200).json(User);
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
      Form.findOne({ _id :  plantilla }),
      Usuarios.findOne({ _id : usuario }),
    ]);
    if (!plantillaDB || !usuarioDB) {
      throw boom.badRequest(
        "La plantilla ó el usuario no se encuentra registradas en la DB"
      );
    };
    console.log(usuarioDB.cuentasAhorro[0].numeroCuenta)
    const cuentaExiste = usuarioDB.cuentasAhorro.some(
      (cuenta) => cuenta.numeroCuenta === cuentaDestino
    );
    if (!cuentaExiste) {
      throw boom.badRequest("La cuenta de destino no existe para este usuario");
    }
    
    

    const newQr = new Qr({
      plantilla,
      usuario,
      cuentaDestino,
      ...remaining,
    });

    const qrDataJSON = JSON.stringify(newQr);

    const qrCode = await qrcode.toDataURL(qrDataJSON);

    fs.writeFileSync('codigo_qr.png', qrCode);

    await newQr.save();
    res.status(200).json({data : newQr , code: qrcode});
  } catch (err) {
    next(err);
  }
};
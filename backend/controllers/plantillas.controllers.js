import { ObjectId } from "mongodb";
import { db } from "../config/mongoClient.js";
import Plantilla from "./../models/Plantillas.js";

const plantillas = db.collection("plantillas");

export const getAll = async (req, res, next) => {
  try {
    const data = await plantillas.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const data = await plantillas.find({ _id: req.params.id }).toArray();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const createPlantilla = async (req, res, next) => {
  try {
    const { nombre, precio,  ...remaining } = req.body;
    const nombreDB = await Plantilla.findOne({ nombre })
    if (nombreDB) {
      throw boom.badRequest(
        `La plantilla ${nombreDB.nombre} ingresada ya se encuentra registrada`
      );
    };
    if (precio < 1){
      const newPlantilla = new Plantilla({
        nombre,
        precio: 10000,
        ...remaining,
      });
      await newPlantilla.save();
      res.status(200).json(newPlantilla);
    }
    const newPlantilla = new Plantilla({
      nombre,
      precio,
      ...remaining,
    });
    await newPlantilla.save();
    res.status(200).json(newPlantilla);
  } catch (err) {
    next(err);
  }
};

export const updatePlantilla = async (req, res, next) => {
  try {
    const oid = req.params.id;
    const existePlantilla = await plantillas.findOne({ _id: oid });
    if (!existePlantilla)
      throw boom.notFound("Plantilla ID no encontrada en la base de datos");
    const { nombre, precio,  ...remaining } = req.body;
    const nombreDB = await Plantilla.findOne({ nombre })
    if (nombreDB) {
      throw boom.badRequest(
        `La plantilla ${nombreDB.nombre} ingresada ya se encuentra registrada`
      );
    };
    if (precio < 1){
      const newPlantilla = new Plantilla({
        nombre,
        precio: 10000,
        ...remaining,
      });
      const modified = await Plantilla.findOneAndUpdate(
        { _id: req.params.id },
        newPlantilla,
        { new: true }
      );
      res.status(200).json(modified);
    }
    const newPlantilla = new Plantilla({
      nombre,
      precio,
      ...remaining,
    });
    const modified = await Plantilla.findOneAndUpdate(
      { _id: req.params.id },
      newPlantilla,
      { new: true }
    );
    res.status(200).json(modified);
  } catch (err) {
    next(err);
  }
};

export const deletePlantilla = async (req, res, next) => {
  try {
    const modified = await Plantilla.findOneAndUpdate(
      { _id: req.params.id },
      { estado: false },
      { new: true }
    );
    res.status(200).json(modified);
  } catch (err) {
    next(err);
  }
};

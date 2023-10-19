import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const QrSchema = new Schema({
  plantilla: {
    type: Schema.Types.ObjectId,
    ref: "formularios",
    required: true,
  },
  nombre: {
    type: String,
    required: false,
    unique: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  cuentaDestino: {
    type: Number,
    required: true,
    trim: true,
  },
  imagen: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
},
{
  timestamps: true,
  versionKey: false,
});

export default model("qrs", QrSchema);
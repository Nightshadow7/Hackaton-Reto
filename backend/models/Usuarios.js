import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    rol: {
      type: String,
      enum: ["ENTIDAD", "USUARIO"],
      default: "USUARIO",
      required: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tipoDocumento: {
      type: String,
      required: true,
      enum: [
        "Cédula de Ciudadanía",
        "Tarjeta Identidad",
        "Tarjeta Extranjería",
      ],
    },
    numeroDocumento: {
      type: Number,
      required: true,
      unique: true,
    },
    cuentasAhorro: {
      type: [
        {
          numeroCuenta: Number,
          saldo: Number,
        },
      ],
    },
    movimientos: {
      type: [
        {
          fecha: Date,
          monto: Number,
          tipo: {
            type: String,
            enum: ["INGRESO", "EGRESO"],
          },
        },
      ],
    },
    qrs: [
      {
        qrs: {
          type: Schema.Types.ObjectId,
          ref: "qrs"
        }
      },
    ],
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
  }
);

UserSchema.statics.encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

UserSchema.statics.comparePassword = (password, receivedPassword) => {
  return bcryptjs.compareSync(password, receivedPassword);
};

export default model("usuarios", UserSchema);

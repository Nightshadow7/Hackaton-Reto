import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tipoDocumento: {
    type: String,
    default: 'Cédula de Ciudadanía'
  },
  numeroDocumento: {
    type: Number,
    required: true
  },
  cuentasAhorro: [{
    numeroCuenta: String,
    saldo: {
      type: Number,
      default: 200000
    },
    movimientos: [{
      fecha: Date,
      monto: Number,
      tipo: {
        enum: ['INGRESO', 'EGRESO'],
        type: String
      }
    }]
  }],
  estado: {
    type: Boolean,
    default: true
  }
});

UserSchema.statics.encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

UserSchema.statics.comparePassword = (password, receivedPassword) => {
  return bcryptjs.compareSync(password, receivedPassword);
};

export default model("usuarios", UserSchema);

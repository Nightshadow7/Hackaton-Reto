import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  numeroDocumento: {
    type: Number,
    required: true
  },
  tipoDocumento: {
    type: String,
    default: 'Cédula de Ciudadanía'
  },
  cuentasAhorro: [{
    numeroCuenta: String,
    pin: Number,
    saldo: Number,
    movimientos: [{
      fecha: Date,
      monto: Number,
      tipo: {
        enum: ['INGRESO', 'EGRESO'],
        type: String
      }
    }]
  }]
});

export default model('usuarios', UserSchema);
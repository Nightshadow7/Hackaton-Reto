import mongoose from 'mongoose';

const campoSchema = new mongoose.Schema({
  titulo: String,
  tipo: {
    type: String,
    enum: ['text', 'number'],
  },
  requerido: Boolean,
});

const formularioSchema = new mongoose.Schema({
  nombre: String,
  campos: [campoSchema],
});

export default mongoose.model('formularios', formularioSchema);

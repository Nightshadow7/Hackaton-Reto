import mongoose from 'mongoose';

const campoSchema = new mongoose.Schema({
  titulo: String,
  tipo: String,
  requerido: Boolean,
});

const formularioTemporalSchema = new mongoose.Schema({
  nombre: String,
  campos: [campoSchema], 
});

export default mongoose.model('formulariostems', formularioTemporalSchema);

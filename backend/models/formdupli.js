import mongoose from "mongoose";

const formularioTemporalSchema = new mongoose.Schema(
  {
    nombre: String,
    campos: [{
      titulo: String,
      tipo: String,
      requerido: {
        type: Boolean,
        default: false
      },
    }],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("formularioseditados", formularioTemporalSchema);

import { Schema, model } from "mongoose";

const PlantillaSchema = new Schema({
  nombre:{
    type: String,
    required: true,
    unique: true,
  },
  precio: {
    type: Number,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  adicional:{
    type: Schema.Types.Mixed
  } ,
},
{
  versionKey: false,
});


export default model("plantillas", PlantillaSchema);

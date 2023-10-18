import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mongooseConnection } from "./config/mongoose.js";
import { mongoClientConnection } from "./config/mongoClient.js";
import { logErrors, errorHandler, isBoomError } from "./middlewares/errorHandler.js";
import { router as formularioRoutes } from './routes/form.routes.js';
import { router as formularioDupliRoutes } from './routes/formdupli.routes.js';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
}));

mongoClientConnection();
mongooseConnection();

// Rutas de la aplicación
app.use('/api/formulario', formularioRoutes);
app.use('/api/formulario/temp', formularioDupliRoutes);

// Manejo de errores
app.use(logErrors);
app.use(isBoomError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

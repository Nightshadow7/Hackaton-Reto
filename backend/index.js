import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { logErrors, errorHandler, isBoomError } from "./middlewares/errorHandler";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
}));

// aquí las rutas
app.use(logErrors)
app.use(isBoomError)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
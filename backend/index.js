import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mongooseConnection } from "./config/mongoose.js";
import { mongoClientConnection } from "./config/mongoClient.js";
import { logErrors, errorHandler, isBoomError } from "./middlewares/errorHandler.js";
import router from "./routes/index.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
}));

mongoClientConnection();
mongooseConnection();
// aquí las rutas
app.use('/api', router);
app.use(logErrors)
app.use(isBoomError)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
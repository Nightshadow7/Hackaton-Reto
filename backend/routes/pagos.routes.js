import express from "express";
import { procesarPago } from "../controllers/usuarios.controllers.js";

const router = express.Router();

// Ruta para procesar un pago
router.post("/procesar-pago", procesarPago);

export default router;

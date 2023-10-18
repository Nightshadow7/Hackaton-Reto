import service from "../controllers/plantillas.controllers.js";
import { Router } from "express";

const router = Router();

router.get('/', service.getAllFormularios);
//router.get('/:id', service.getOne);
router.post('/', service.addFormulario);
//router.put('/:id', service.updatePlantilla);
router.delete('/:id', service.deleteFormulario);

export default router;
import * as service from "../controllers/plantillas.controllers.js";
import { Router } from "express";

const router = Router();

router.get('/', service.getAll);
router.get('/:id', service.getOne);
router.post('/', service.createPlantilla);
router.put('/:id', service.updatePlantilla);
router.delete('/:id', service.deletePlantilla);

export default router;
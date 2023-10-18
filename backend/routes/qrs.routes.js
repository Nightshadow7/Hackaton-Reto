import * as service from "../controllers/qrs.controllers.js";
import { Router } from "express";

const router = Router();

router.get('/', service.getAll);
router.get('/:id', service.getOne);
router.post('/', service.createQr);
//router.put('/:id', service.updatePlantilla);
// router.delete('/:id', service.deleteFormulario);

export default router;
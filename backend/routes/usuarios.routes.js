import * as service from "../controllers/usuarios.controllers.js";
import { Router } from "express";

const router = Router();

router.get('/', service.getAll);
router.get('/:id', service.getOne);
router.post('/', service.createUsuario);
router.put('/:id', service.updateUsuario);
router.delete('/:id', service.deleteUsuario);

export default router;
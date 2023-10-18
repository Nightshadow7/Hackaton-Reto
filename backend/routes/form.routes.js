import express from 'express';
import formularioController from '../controllers/form.controller.js';
import checkUserRole from '../middlewares/authValidator.js';

const router = express.Router();

router.get('/', formularioController.getAllFormularios);

const restrictToEntidad = checkUserRole(['entidad']);

router.use(restrictToEntidad);
router.delete('/:id', formularioController.deleteFormulario);
router.put('/:id', formularioController.actualizarFormularioTemporal);

export { router };

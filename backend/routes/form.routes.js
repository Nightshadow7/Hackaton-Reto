import express from 'express';
import formularioController from '../controllers/form.controller.js';  

const router = express.Router();

router.post('/', formularioController.addFormulario);  
router.get('/', formularioController.getAllFormularios);  
router.delete('/:id', formularioController.deleteFormulario);  
export { router };

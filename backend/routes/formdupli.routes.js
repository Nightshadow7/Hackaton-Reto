import express from 'express';
import formularioController from '../controllers/form.controller.js'; 

const router = express.Router();

router.post('/duplicar/:id', formularioController.duplicarFormulario);  
router.put('/actualizar/:id', formularioController.actualizarFormularioTemporal); 

export default router ;

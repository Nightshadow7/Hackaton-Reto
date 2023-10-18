import { Router } from "express";
import * as service from "../controllers/usuarios.controllers.js";
import * as schemas from "../schemas/usuario.schema.js";
import { joiValidator } from "../middlewares/joiValidator.js";

const router = Router();

router.get("/", service.getAll);
router.delete("/:id", service.deleteUsuario);

router.get(
  "/:id",
  joiValidator(schemas.getUsuarioSchema, "params"),
  service.getOne
);
router.post(
  "/cuenta/:id",
  [
    joiValidator(schemas.getUsuarioSchema, "params"),
    joiValidator(schemas.createCuentaAhorroSchema, "body"),
  ],
  service.createCuentaAhorros
);
router.post(
  "/",
  joiValidator(schemas.createUsuarioSchema, "body"),
  service.createUsuario
);
router.put("/:id", service.updateUsuario);

export default router;

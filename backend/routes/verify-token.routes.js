import { Router } from "express";
import verifyToken from "../controllers/verifyToken.js";

const router = Router();

router.post("/", verifyToken);

export default router;
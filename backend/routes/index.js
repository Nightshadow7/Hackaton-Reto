import { Router } from "express";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const removerExtension = (filename) => {
  return filename.split(".").shift();
};

fs.readdirSync(__dirname).filter(async (file) => {
  const archivoSinExtension = removerExtension(file);
  const skip = ["index"].includes(archivoSinExtension);
  if (!skip) {
    const { default: defaultRouter } = await import(
      `./${archivoSinExtension}.routes.js`
    );
    router.use(`/${archivoSinExtension}`, defaultRouter);
    console.log("---->", archivoSinExtension);
  }
});

/* router.get('*', (req, res) => {
    res.status(404);
    res.send({error: "Not found"});
}) */

export default router;

import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dir = `${__dirname}/images`;
const outputDir = `${__dirname}/base64`;

function convertToBase64(file) {
  const imageData = fs.readFileSync(file, { encoding: "base64" });
  const imageDataWithPrefix = `data:image/png;base64,${imageData}`;
  return imageDataWithPrefix;
}

const base64Images = {};
fs.readdir(dir, (err, files) => {
  if (err) {
    console.error("Error al leer el directorio:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isFile()) {
      const imageData = fs.readFileSync(filePath, { encoding: "base64" });

      // Agrega "data:image/png;base64," al comienzo de la cadena base64
      const imageDataWithPrefix = `data:image/png;base64,${imageData}`;

      base64Images[file] = imageDataWithPrefix;

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }
      const outputFilePath = path.join(outputDir, `${file}.txt`);
      fs.writeFileSync(outputFilePath, imageDataWithPrefix);
    }
  });
  console.log("Imágenes convertidas y almacenadas en", outputDir);
});

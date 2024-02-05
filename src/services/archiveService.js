import fs from "fs";
import zlib from "zlib";
import path from "path";

import { errMessage } from "../config/constants.js";
import { consoleColors } from "../config/constants.js";
import { checkFileAccessibility } from "../utils/isAccess.js";

export const compressFile = async ([sourcePath, destinationPath]) => {
  try {
    await Promise.all([
      checkFileAccessibility(sourcePath),
      checkFileAccessibility(destinationPath),
    ]);
    const correctSourcePath = path.resolve(process.cwd(), sourcePath);
    const { base } = path.parse(correctSourcePath);
    const fileName = `${base}.br`;
    const correctDestinationPath = path.resolve(process.cwd(), destinationPath, fileName);
    const sourceStream = fs.createReadStream(correctSourcePath);
    const destinationStream = fs.createWriteStream(correctDestinationPath);
    const brotliStream = zlib.createBrotliCompress();
    sourceStream.pipe(brotliStream).pipe(destinationStream);
    await new Promise((resolve, reject) => {
      destinationStream.on("finish", () => {
        console.log(consoleColors.green, `Archiving was successful`);
        resolve();
      });
      destinationStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};

export const decompressFile = async ([sourcePath, destinationPath]) => {
  try {
    await Promise.all([
      checkFileAccessibility(sourcePath),
      checkFileAccessibility(destinationPath),
    ]);
    const correctSourcePath = path.resolve(process.cwd(), sourcePath);
    const { name } = path.parse(correctSourcePath);
    const correctDestinationPath = path.resolve(process.cwd(), destinationPath, name);
    const sourceStream = fs.createReadStream(correctSourcePath);
    const destinationStream = fs.createWriteStream(correctDestinationPath);
    const brotliStream = zlib.createBrotliDecompress();
    sourceStream.pipe(brotliStream).pipe(destinationStream);
    await new Promise((resolve, reject) => {
      destinationStream.on("finish", () => {
        console.log(consoleColors.green, `Unzipping was successful`);
        resolve();
      });
      destinationStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};

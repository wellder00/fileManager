import fs from "fs";
import * as fsPromises from "fs/promises";
import path from "path";

import { errMessage } from "../config/constants.js";
import { consoleColors } from "../config/constants.js";
import { checkFileAccessibility } from "../utils/isAccess.js";

export const printFileContent = ([filePath]) => {
  try {
    const readableStream = fs.createReadStream(filePath, { encoding: "utf8" });
    readableStream.on("data", (chunk) => {
      console.log(chunk);
    });

    readableStream.on("error", () => {
      console.error(consoleColors.red, "Error reading file");
    });
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};

// Another example realization cat function
// export const printFileContentAsync = async ([filePath]) => {
//   try {
//     const fileContent = await fsPromises.readFile(filePath, { encoding: "utf8" });
//     console.log(fileContent);
//   } catch (error) {
//     console.error(consoleColors.red, errMessage);
//   }
// };

export const addFile = async ([fileName]) => {
  try {
    const filePath = path.resolve(process.cwd(), fileName);

    await fsPromises.writeFile(filePath, "");

    console.log(`Empty file "${fileName}" created successfully.`);
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};

export const renameFile = async ([oldName, newName]) => {
  try {
    const oldPath = path.resolve(process.cwd(), oldName);
    const newPath = path.resolve(process.cwd(), newName);
    await fsPromises.rename(oldPath, newPath);
    console.log(`File "${oldName}" renamed to "${newName}" successfully.`);
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};

export const copyFile = ([sourcePath, destinationDirectory]) => {
  try {
    if (!destinationDirectory) {
      throw new Error(`Destination directory is not provided. ${destinationDirectory}`);
    }
    const sourceFileName = path.basename(sourcePath);
    const destinationPath = path.join(destinationDirectory, sourceFileName);

    const readableStream = fs.createReadStream(sourcePath);
    const writableStream = fs.createWriteStream(destinationPath);

    readableStream.on("error", (error) => {
      console.error(consoleColors.red, errMessage);
    });

    writableStream.on("error", (error) => {
      console.error(consoleColors.red, errMessage);
    });

    readableStream.pipe(writableStream);

    writableStream.on("finish", () => {
      console.log(consoleColors.green, `File copied successfully to ${destinationPath}`);
    });
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};


// Another example realization cp function
// const copyFile = async ([sourcePath, destinationDirectory]) => {
//   try {
//     if (!destinationDirectory) {
//       throw new Error(`Destination directory is not provided. ${destinationDirectory}`);
//     }
//     const sourceFileName = path.basename(sourcePath);
//     const destinationPath = path.join(destinationDirectory, sourceFileName);

//     const readableStream = fs.createReadStream(sourcePath);
//     const writableStream = fs.createWriteStream(destinationPath);

//     await new Promise((resolve, reject) => {
//       readableStream.on("error", (error) => {
//         console.error(consoleColors.red, error);
//         reject(error);
//       });

//       writableStream.on("error", (error) => {
//         console.error(consoleColors.red, error);
//         reject(error);
//       });

//       writableStream.on("finish", () => {
//         console.log(consoleColors.green, `File copied successfully to ${destinationPath}`);
//         resolve();
//       });

//       readableStream.pipe(writableStream);
//     });
//   } catch (error) {
//     console.error(consoleColors.red, error);
//   }
// };


export const moveFile = async ([sourcePath, destinationDirectory]) => {
  const sourceFileName = path.basename(sourcePath);
  try {
    await Promise.all([
      checkFileAccessibility(sourcePath),
      checkFileAccessibility(destinationDirectory),
    ]);

    const destinationPath = path.join(destinationDirectory, sourceFileName);

    const readableStream = fs.createReadStream(sourcePath);
    const writableStream = fs.createWriteStream(destinationPath);

    readableStream.pipe(writableStream);

    await new Promise((resolve, reject) => {
      writableStream.on("finish", resolve);
      writableStream.on("error", reject);
    });

    await fsPromises.unlink(sourcePath);

    console.log(
      consoleColors.green,
      `File '${sourceFileName}' moved successfully to '${destinationDirectory}'.`,
    );
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};

export const removeFile = async ([pathToRemoveFile]) => {
  try {
    const filePath = path.resolve(process.cwd(), pathToRemoveFile);

    const fileExists = await fsPromises
      .access(filePath)
      .then(() => true)
      .catch(() => false);
    if (!fileExists) {
      throw new Error(`File '${pathToRemoveFile}' does not exist.`);
    }

    await fsPromises.unlink(filePath);
    console.log(consoleColors.green, `File '${pathToRemoveFile}' removed.`);
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};

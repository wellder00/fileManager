import fs from "fs";
import * as fsPromises from "fs/promises";
import path from "path";

import { errMessage } from "../config/constants.js";

export const printFileContent = ([filePath]) => {
  try {
    const readableStream = fs.createReadStream(filePath, { encoding: "utf8" });
    readableStream.on("data", (chunk) => {
      console.log(chunk);
    });

    readableStream.on("error", () => {
      console.error("Error reading file");
    });
  } catch (error) {
    console.error(errMessage);
  }
};

// Another example realization cat function
export const printFileContentAsync = async ([filePath]) => {
  try {
    const fileContent = await fsPromises.readFile(filePath, { encoding: "utf8" });
    console.log(fileContent);
  } catch (error) {
    console.error(errMessage);
    console.error(error);
  }
};

export const addFile = async ([fileName]) => {
  try {
    const filePath = path.resolve(process.cwd(), fileName);

    await fsPromises.writeFile(filePath, "");

    console.log(`Empty file "${fileName}" created successfully.`);
  } catch (error) {
    console.error("Failed to create empty file");
  }
};

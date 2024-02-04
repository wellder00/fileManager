import path from "path";
import fs from "fs/promises";
import { errMessage } from "../config/constants.js";
import { consoleColors } from "../config/constants.js";

export const moveUp = ([arg]) => {
  try {
    if (arg) throw new Error();
    process.chdir("..");
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};

export const showList = async ([arg]) => {
  try {
    if (arg) throw new Error();
    const filesList = await fs.readdir(path.resolve(process.cwd()), { withFileTypes: true });
    const detailedList = await Promise.all(
      filesList.map(async (file) => {
        return {
          Name: file.name,
          Type: file.isFile() ? "file" : "directory",
        };
      }),
    );
    detailedList.sort((a, b) => {
      if (a.Type !== b.Type) {
        return a.Type.localeCompare(b.Type);
      } else {
        return a.Name.localeCompare(b.Name);
      }
    });

    console.table(detailedList);
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};

export const moveToDir = ([directoryPath] = "") => {
  try {
    process.chdir(directoryPath);
  } catch (error) {
    console.error(consoleColors.red, errMessage);
  }
};

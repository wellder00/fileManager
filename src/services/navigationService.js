import path from "path";
import fs from "fs/promises";
import { errMessage } from "../config/constants.js";

export const moveUp = () => {
  try {
    process.chdir("..");
  } catch (error) {
    console.error(errMessage);
  }
};

export const showList = async () => {
  try {
    const filesList = await fs.readdir(path.resolve(process.cwd()));
    const detailedList = await Promise.all(
      filesList.map(async (file) => {
        const stats = await fs.stat(path.join(process.cwd(), file));
        return {
          Name: file,
          Type: stats.isFile() ? "file" : "directory",
        };
      }),
    );
    detailedList.sort((a, b) => {
      if (a.Type === "directory" && b.Type === "file") {
        return -1;
      } else if (a.Type === "file" && b.Type === "directory") {
        return 1;
      } else {
        return 0;
      }
    });

    console.table(detailedList);
  } catch (error) {
    console.error(errMessage);
  }
};

export const moveToDir = (directoryPath) => {
  try {
    process.chdir(directoryPath);
  } catch (error) {
    console.error(errMessage);
  }
};

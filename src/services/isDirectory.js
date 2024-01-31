import { stat } from "fs/promises";
import { resolve } from "path";

export const isDirectory = async (pathDirectory) => {
  try {
    const path = resolve(pathDirectory);
    const statistic = await stat(path);
    return statistic.isDirectory();
  } catch (error) {
    return false;
  }
};

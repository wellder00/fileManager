import { access } from "fs/promises";

export const checkFileAccessibility = async (filePath) => {
  try {
    await access(filePath);
  } catch (error) {
    throw new Error(`File "${filePath}" is not accessible`);
  }
};
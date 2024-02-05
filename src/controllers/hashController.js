import { errMessage } from "../config/constants.js";
import { calculateFileHash } from "../services/hashService.js";
import { consoleColors } from "../config/constants.js";

export const printFileHash = async ([filePath]) => {
  try {
    const fileHash = await calculateFileHash(filePath);
    console.log(consoleColors.green, `Hash for file '${filePath}': ${fileHash}`);
  } catch (error) {
    console.error(`Error calculating hash for file '${filePath}': ${error.message}`);
    console.error(consoleColors.red, errMessage);
  }
};

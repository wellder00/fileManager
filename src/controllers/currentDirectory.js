import { consoleColors } from "../config/constants.js";

export const showDirectory = () =>
  console.log(consoleColors.turquoise, `You are currently in ${process.cwd()}`);

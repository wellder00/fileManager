import { consoleColors } from "../config/constants.js";

export const greetTheUser = (name) => {
  const userName = name ? name : "noName";
  console.log(consoleColors.green, `Welcome to the File Manager, ${userName}`);
};

export const sayGoodbye = (name) => {
  const userName = name ? name : "noName";
  console.log(consoleColors.blue, `Thank you for using File Manager, ${userName}, goodbye!`);
};

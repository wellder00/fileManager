import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { getNameUser } from "./cliUtils.js";
import { greetTheUser } from "../controllers/userController.js";
import { showDirectory } from "../controllers/currentDirectory.js";

export const stream = async () => {
  const rl = readline.createInterface({ input, output });
  greetTheUser(getNameUser());
  showDirectory();
  // const answer = await rl.question("What do you think of Node.js? ");

  // console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
};

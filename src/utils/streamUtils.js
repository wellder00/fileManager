import readline from "readline/promises";
import { exit, stdin, stdout } from "process";
import { getNameUser } from "./cliUtils.js";
import { greetTheUser } from "../controllers/userController.js";
import { showDirectory } from "../controllers/currentDirectory.js";
import { occurrence, osInfo } from "../data/events.js";
import { takeLeaveOf } from "../services/userService.js";
import { changeQuotes } from "../utils/regForSpace.js";
import { consoleColors } from "../config/constants.js";

export const stream = async () => {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  try {
    greetTheUser(getNameUser());
    showDirectory();

    rl.on("line", async (input) => {
      const trimmedInput = input.trim().toLowerCase();
      if (trimmedInput === ".exit") {
        await takeLeaveOf(exit);
        return;
      }
      let [cmd, ...args] = trimmedInput.split(" ");
      if (/"|'/g.test(args)) {
        args = changeQuotes(args);
      }

      if (cmd === "os") {
        try {
          const argKey = args.join();
          osInfo[argKey]();
        } catch (error) {
          console.log(consoleColors.red, "Invalid input");
        }
      } else {
        if (!occurrence[cmd]) {
          console.log(consoleColors.red, "Invalid input");
          return;
        }
        args.length >= 0 && args.length <= 2
          ? await occurrence[cmd](args)
          : console.log(consoleColors.red, "Invalid input");
      }

      await showDirectory();
    });

    rl.on("SIGINT", async () => {
      await takeLeaveOf(exit);
    });
  } catch (error) {
    console.error(consoleColors.red, "FS operation failed");
    console.log(error.message);
  }
};

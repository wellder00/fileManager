import readline from "readline/promises";
import { exit, stdin, stdout } from "process";
import { getNameUser } from "./cliUtils.js";
import { greetTheUser } from "../controllers/userController.js";
import { showDirectory } from "../controllers/currentDirectory.js";
import { occurrence } from "../data/events.js";
import { takeLeaveOf } from "../services/userService.js";

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
        args = args
          .join(" ")
          .split(/["'] | ["']/)
          .map((arg) => arg.replace(/"|'/g, ""));
      }
      const eventHandler = occurrence[cmd];

      if (!eventHandler) {
        console.log("Invalid input");
        return;
      }

      switch (args.length) {
        case 0:
          await eventHandler();
          break;
        case 1:
          await eventHandler(args);
          break;

        default:
          console.log("Invalid input");
          return;
      }

      await showDirectory();
    });

    rl.on("SIGINT", async () => {
      await takeLeaveOf(exit);
    });
  } catch (error) {
    console.error("FS operation failed");
    console.log(error.message);
  }
};
